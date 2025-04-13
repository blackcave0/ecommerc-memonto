import { UserProfile } from "./auth";

export interface AdminUser extends UserProfile {
  is_admin: boolean;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  pendingOrders: number;
  recentOrders: OrderSummary[];
}

export interface OrderSummary {
  id: string;
  user_id: string;
  user_email?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  created_at: string;
  payment_status: 'pending' | 'paid' | 'failed';
}

export interface SalesData {
  date: string;
  amount: number;
}

export interface CategorySales {
  category: string;
  amount: number;
}

export interface PaymentMethodStats {
  method: string;
  count: number;
}
