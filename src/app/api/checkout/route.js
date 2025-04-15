import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * @typedef {Object} CartItem
 * @property {string} name - The name of the product.
 * @property {string} image - The URL of the product image.
 * @property {string | number} price - The price of the product (string or number).
 * @property {number} quantity - The quantity of the product.
 */

/**
 * Handles the POST request to create a Stripe Checkout session.
 * @param {Request} req - The incoming request object.
 * @returns {Promise<Response>} - The response object.
 */
export async function POST(req) {
  try {
    /** @type {{ items: CartItem[] }} */
    const { items } = await req.json();

    // Log the items array for debugging
    console.log("Received items:", items);

    // Validate the request payload
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error(
        'Invalid request payload: "items" must be a non-empty array.',
      );
    }

    const lineItems = items.map((item) => {
      if (!item.name || !item.image || !item.price || !item.quantity) {
        throw new Error(
          'Invalid item structure. Each item must have "name", "image", "price", and "quantity".',
        );
      }

      // Parse the price if it's a string (e.g., "$320")
      const parsedPrice =
        typeof item.price === "string"
          ? parseFloat(item.price.replace(/[^0-9.-]+/g, ""))
          : item.price;

      // Ensure price is a valid number
      const unitAmount = Math.round(parsedPrice * 100);
      if (isNaN(unitAmount) || unitAmount <= 0) {
        throw new Error(
          `Invalid price for item "${item.name}". Price must be a positive number.`,
        );
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/checkout?canceled=true`,
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (error) {
    console.error("Error creating Stripe Checkout session:", error); // Log the error
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}

// Example payload for testing
const examplePayload = {
  items: [
    {
      name: "Product 1",
      image: "https://example.com/image.jpg",
      price: 100,
      quantity: 2,
    },
  ],
};
