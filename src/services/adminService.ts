import { supabase } from '@/lib/supabase';
import { AdminUser, DashboardStats, OrderSummary, SalesData, CategorySales, PaymentMethodStats } from '@/types/admin';
import { Order } from '@/types/order';

// Check if a user is an admin
export async function isUserAdmin(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }

    return data?.is_admin === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

// Get admin dashboard statistics
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    // Get total orders
    const { count: totalOrders, error: ordersError } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });

    // Get total revenue
    const { data: revenueData, error: revenueError } = await supabase
      .from('orders')
      .select('total_amount')
      .eq('payment_status', 'paid');

    // Get total customers
    const { count: totalCustomers, error: customersError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('is_admin', false);

    // Get pending orders
    const { count: pendingOrders, error: pendingError } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Get recent orders
    const { data: recentOrders, error: recentError } = await supabase
      .from('orders')
      .select(`
        id,
        user_id,
        status,
        total_amount,
        created_at,
        payment_status,
        profiles(email)
      `)
      .order('created_at', { ascending: false })
      .limit(5);

    if (ordersError || revenueError || customersError || pendingError || recentError) {
      console.error('Error fetching dashboard stats:', { 
        ordersError, revenueError, customersError, pendingError, recentError 
      });
      throw new Error('Failed to fetch dashboard statistics');
    }

    // Calculate total revenue
    const totalRevenue = revenueData?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

    // Format recent orders
    const formattedRecentOrders = recentOrders?.map(order => ({
      id: order.id,
      user_id: order.user_id,
      user_email: order.profiles?.email,
      status: order.status,
      total_amount: order.total_amount,
      created_at: order.created_at,
      payment_status: order.payment_status
    })) || [];

    return {
      totalOrders: totalOrders || 0,
      totalRevenue,
      totalCustomers: totalCustomers || 0,
      pendingOrders: pendingOrders || 0,
      recentOrders: formattedRecentOrders
    };
  } catch (error) {
    console.error('Error in getDashboardStats:', error);
    return {
      totalOrders: 0,
      totalRevenue: 0,
      totalCustomers: 0,
      pendingOrders: 0,
      recentOrders: []
    };
  }
}

// Get all orders with pagination
export async function getAllOrders(page = 1, limit = 10): Promise<{ orders: OrderSummary[], count: number }> {
  try {
    // Get total count
    const { count, error: countError } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      throw countError;
    }

    // Calculate pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Get orders for current page
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id,
        user_id,
        status,
        total_amount,
        created_at,
        payment_status,
        profiles(email)
      `)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      throw error;
    }

    const orders = data.map(order => ({
      id: order.id,
      user_id: order.user_id,
      user_email: order.profiles?.email,
      status: order.status,
      total_amount: order.total_amount,
      created_at: order.created_at,
      payment_status: order.payment_status
    }));

    return {
      orders,
      count: count || 0
    };
  } catch (error) {
    console.error('Error fetching all orders:', error);
    return { orders: [], count: 0 };
  }
}

// Update order status
export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
}

// Update payment status
export async function updatePaymentStatus(orderId: string, status: Order['payment_status']): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ payment_status: status, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error updating payment status:', error);
    return false;
  }
}

// Get sales data for chart
export async function getSalesData(period: 'week' | 'month' | 'year' = 'month'): Promise<SalesData[]> {
  try {
    let timeFilter: string;
    
    switch (period) {
      case 'week':
        timeFilter = 'now() - interval \'7 days\'';
        break;
      case 'year':
        timeFilter = 'now() - interval \'1 year\'';
        break;
      case 'month':
      default:
        timeFilter = 'now() - interval \'30 days\'';
        break;
    }

    const { data, error } = await supabase
      .rpc('get_sales_by_date', { time_period: timeFilter });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching sales data:', error);
    
    // Return mock data for development
    const mockData: SalesData[] = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      mockData.push({
        date: date.toISOString().split('T')[0],
        amount: Math.floor(Math.random() * 5000) + 1000
      });
    }
    
    return mockData;
  }
}

// Get sales by category
export async function getSalesByCategory(): Promise<CategorySales[]> {
  try {
    const { data, error } = await supabase
      .rpc('get_sales_by_category');

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching category sales:', error);
    
    // Return mock data for development
    return [
      { category: 'Clothing', amount: 12500 },
      { category: 'Accessories', amount: 8300 },
      { category: 'Footwear', amount: 6200 },
      { category: 'Outerwear', amount: 4800 },
      { category: 'Activewear', amount: 3100 }
    ];
  }
}

// Get payment method statistics
export async function getPaymentMethodStats(): Promise<PaymentMethodStats[]> {
  try {
    const { data, error } = await supabase
      .rpc('get_payment_method_stats');

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching payment method stats:', error);
    
    // Return mock data for development
    return [
      { method: 'Credit Card', count: 145 },
      { method: 'PayPal', count: 87 },
      { method: 'Bank Transfer', count: 42 },
      { method: 'Cash on Delivery', count: 23 }
    ];
  }
}

// Make a user an admin
export async function makeUserAdmin(userId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ is_admin: true })
      .eq('id', userId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error making user admin:', error);
    return false;
  }
}
