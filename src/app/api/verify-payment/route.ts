import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(req: Request) {
  try {
    const url = new URL(req.url as string);
    const sessionId = url.searchParams.get("session_id");

    if (!sessionId) {
      return new Response(JSON.stringify({ error: "Missing session_id" }), {
        status: 400,
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return new Response(
      JSON.stringify({ payment_status: session.payment_status }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error verifying payment session:", error);
    return new Response(
      JSON.stringify({ error: "Failed to verify payment session" }),
      { status: 500 },
    );
  }
}
