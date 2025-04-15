import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import { OrderSummary } from '@/types/order';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = req.query;

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing userId' });
  }

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

    const orders: OrderSummary[] = data.map((order: any) => ({
      id: order.id,
      status: order.status,
      total_amount: order.total_amount,
      created_at: order.created_at,
      item_count: order.order_items[0]?.count || 0,
      tracking_number: order.tracking_number,
    }));

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}
