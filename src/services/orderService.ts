import { supabase } from '@/lib/supabase';
import { Order, OrderSummary } from '@/types/order';

export async function getUserOrders(userId: string): Promise<OrderSummary[]> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id,
        status,
        total_amount,
        created_at,
        tracking_number,
        order_items(count)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data.map((order: any) => ({
      id: order.id,
      status: order.status,
      total_amount: order.total_amount,
      created_at: order.created_at,
      item_count: order.order_items[0].count,
      tracking_number: order.tracking_number,
    }));
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
}

export async function getOrderDetails(orderId: string): Promise<Order | null> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(
          id,
          product_id,
          product_name,
          product_image,
          quantity,
          price
        )
      `)
      .eq('id', orderId)
      .single();

    if (error) {
      throw error;
    }

    return {
      ...data,
      items: data.order_items,
    };
  } catch (error) {
    console.error('Error fetching order details:', error);
    return null;
  }
}

// This is a mock function for demonstration purposes
// In a real application, you would implement actual tracking logic
export async function getOrderTracking(trackingNumber: string) {
  // Simulate API call to shipping provider
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        trackingNumber,
        status: 'in_transit',
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        trackingHistory: [
          {
            status: 'order_placed',
            location: 'Online',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            status: 'processing',
            location: 'Warehouse',
            timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            status: 'shipped',
            location: 'Distribution Center',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            status: 'in_transit',
            location: 'In Transit',
            timestamp: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ],
      });
    }, 500);
  });
}
