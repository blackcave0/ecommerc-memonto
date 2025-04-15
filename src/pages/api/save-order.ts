import { supabase } from "@/lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { OrderItem } from "@/types/order";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { stripeSessionId, userId, order, items } = req.body;

  // Validate request payload
  if (!stripeSessionId || !userId || !order || !items) {
    console.error("Invalid request payload:", {
      stripeSessionId,
      userId,
      order,
      items,
    });
    return res.status(400).json({ error: "Invalid request payload" });
  }

  try {
    // Verify the Stripe session
    const session = await stripe.checkout.sessions.retrieve(stripeSessionId);

    if (session.payment_status !== "paid") {
      console.error("Payment not confirmed for session:", stripeSessionId);
      return res.status(400).json({ error: "Payment not confirmed" });
    }

    // Parse and validate total amount
    const totalAmount =
      typeof order.total_amount === "string"
        ? parseFloat(order.total_amount.replace(/[^0-9.-]+/g, ""))
        : order.total_amount;

    if (isNaN(totalAmount) || totalAmount <= 0) {
      console.error("Invalid total_amount value:", order.total_amount);
      return res.status(400).json({ error: "Invalid total_amount value" });
    }

    // Ensure the order ID is set
    const orderId = order.id || uuidv4(); // Use provided ID or generate a new UUID

    // Check if the order already exists
    const existingOrder = await supabase
      .from("orders")
      .select("id")
      .eq("id", orderId)
      .single();

    if (existingOrder.data) {
      console.log("Order already exists. Skipping insertion.");
      return res
        .status(200)
        .json({ success: true, orderId: existingOrder.data.id });
    }

    // Save the order to the database
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        id: orderId, // Use the ensured order ID
        user_id: userId,
        status: "pending",
        total_amount: totalAmount,
        created_at: new Date().toISOString(),
        shipping_address: JSON.stringify(order.shipping_address),
        shipping_pincode: order.shipping_pincode,
        payment_method: order.payment_method,
        payment_status: "paid",
        stripe_session_id: stripeSessionId,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Error inserting order into database:", orderError);
      throw orderError;
    }

    // Deduplicate items based on product_id
    const uniqueItems = items.reduce((acc: OrderItem[], current: OrderItem) => {
      const existingItem = acc.find(
        (item) => item.product_id === current.product_id,
      );
      if (existingItem) {
        existingItem.quantity += current.quantity; // Combine quantities for duplicate products
      } else {
        acc.push(current);
      }
      return acc;
    }, []);

    // Save the order items
    const existingOrderItems = await supabase
      .from("order_items")
      .select("product_id, order_id")
      .eq("order_id", orderData.id);

    const existingProductIds =
      existingOrderItems.data?.map((item) => item.product_id) || [];

    const newOrderItems = uniqueItems
      .filter(
        (item: OrderItem) => !existingProductIds.includes(item.product_id),
      ) // Exclude duplicates
      .map((item: OrderItem) => ({
        order_id: orderData.id,
        product_id: item.product_id,
        product_name: item.product_name,
        product_image: item.product_image,
        quantity: item.quantity,
        price: item.price,
      }));

    if (newOrderItems.length > 0) {
      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(newOrderItems);
      if (itemsError) {
        console.error("Error inserting order items into database:", itemsError);
        throw itemsError;
      }
    } else {
      console.log("No new order items to insert. Skipping insertion.");
    }

    res.status(200).json({ success: true, orderId: orderData.id });
  } catch (error) {
    console.error("Error in save-order handler:", error);
    res.status(500).json({
      error: "Failed to save order",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
