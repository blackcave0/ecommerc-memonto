export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image?: string;
  quantity: number;
  price: number;
  order_id: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  created_at: string;
  updated_at: string;
  shipping_address: string;
  shipping_pincode: string;
  payment_method: string;
  payment_status: 'pending' | 'paid' | 'failed';
  tracking_number?: string;
  estimated_delivery?: string;
  items?: OrderItem[];
}

export interface OrderSummary {
  id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  created_at: string;
  item_count: number;
  tracking_number?: string;
}
