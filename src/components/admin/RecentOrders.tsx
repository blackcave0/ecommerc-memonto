'use client';

import { OrderSummary } from '@/types/admin';
import Link from 'next/link';
import { 
  CheckCircle, 
  Clock, 
  Truck, 
  Package, 
  XCircle,
  ExternalLink
} from 'lucide-react';

interface RecentOrdersProps {
  orders: OrderSummary[];
  title?: string;
}

export function RecentOrders({ orders, title = 'Recent Orders' }: RecentOrdersProps) {
  // Function to get status icon
  const getStatusIcon = (status: OrderSummary['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  // Function to get status text color
  const getStatusColor = (status: OrderSummary['status']) => {
    switch (status) {
      case 'pending':
        return 'text-amber-500 bg-amber-50';
      case 'processing':
        return 'text-blue-500 bg-blue-50';
      case 'shipped':
        return 'text-purple-500 bg-purple-50';
      case 'delivered':
        return 'text-green-500 bg-green-50';
      case 'cancelled':
        return 'text-red-500 bg-red-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">{title}</h3>
        <Link 
          href="/admin/orders" 
          className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
        >
          View All
          <ExternalLink className="w-4 h-4 ml-1" />
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/admin/orders/${order.id}`} className="hover:underline">
                    #{order.id.substring(0, 8)}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.user_email || 'Unknown'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(order.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${order.total_amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="ml-1 capitalize">{order.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.payment_status === 'paid' 
                      ? 'text-green-500 bg-green-50' 
                      : order.payment_status === 'pending' 
                        ? 'text-amber-500 bg-amber-50' 
                        : 'text-red-500 bg-red-50'
                  }`}>
                    {order.payment_status === 'paid' 
                      ? <CheckCircle className="w-4 h-4 mr-1" /> 
                      : order.payment_status === 'pending' 
                        ? <Clock className="w-4 h-4 mr-1" /> 
                        : <XCircle className="w-4 h-4 mr-1" />
                    }
                    <span className="capitalize">{order.payment_status}</span>
                  </span>
                </td>
              </tr>
            ))}
            
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
