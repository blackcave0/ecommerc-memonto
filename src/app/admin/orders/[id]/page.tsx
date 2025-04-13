'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getOrderDetails, updateOrderStatus, updatePaymentStatus } from '@/services/adminService';
import { Order } from '@/types/order';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Truck, 
  Package, 
  XCircle,
  User,
  MapPin,
  CreditCard,
  Calendar,
  Tag
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setIsLoading(true);
      try {
        if (typeof id !== 'string') {
          throw new Error('Invalid order ID');
        }
        
        const orderData = await getOrderDetails(id);
        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order details:', error);
        // Use mock data if API fails
        setOrder({
          id: id as string,
          user_id: 'user123',
          status: 'processing',
          total_amount: 129.99,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          shipping_address: '123 Main St, Anytown, CA 12345',
          shipping_pincode: '12345',
          payment_method: 'Credit Card',
          payment_status: 'paid',
          tracking_number: 'TRK123456789',
          estimated_delivery: new Date(Date.now() + 86400000 * 3).toISOString(),
          items: [
            {
              id: 'item1',
              product_id: 'prod1',
              product_name: 'Premium Headphones',
              product_image: 'https://placehold.co/100x100',
              quantity: 1,
              price: 99.99,
              order_id: id as string
            },
            {
              id: 'item2',
              product_id: 'prod2',
              product_name: 'Wireless Charger',
              product_image: 'https://placehold.co/100x100',
              quantity: 1,
              price: 30.00,
              order_id: id as string
            }
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  // Function to handle status update
  const handleStatusUpdate = async (newStatus: Order['status']) => {
    if (!order) return;
    
    setIsUpdating(true);
    try {
      const success = await updateOrderStatus(order.id, newStatus);
      
      if (success) {
        // Update local state
        setOrder(prevOrder => {
          if (!prevOrder) return null;
          return { ...prevOrder, status: newStatus };
        });
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      // In a real app, show an error notification
    } finally {
      setIsUpdating(false);
    }
  };

  // Function to handle payment status update
  const handlePaymentStatusUpdate = async (newStatus: Order['payment_status']) => {
    if (!order) return;
    
    setIsUpdating(true);
    try {
      const success = await updatePaymentStatus(order.id, newStatus);
      
      if (success) {
        // Update local state
        setOrder(prevOrder => {
          if (!prevOrder) return null;
          return { ...prevOrder, payment_status: newStatus };
        });
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
      // In a real app, show an error notification
    } finally {
      setIsUpdating(false);
    }
  };

  // Function to get status icon
  const getStatusIcon = (status: Order['status']) => {
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
  const getStatusColor = (status: Order['status']) => {
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
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Order not found</h2>
        <p className="mt-2 text-gray-600">The order you are looking for does not exist.</p>
        <Link 
          href="/admin/orders" 
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/orders" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </Link>
          <h1 className="text-2xl font-bold">Order #{order.id.substring(0, 8)}</h1>
          <span className={`px-3 py-1 inline-flex items-center text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
            {getStatusIcon(order.status)}
            <span className="ml-1 capitalize">{order.status}</span>
          </span>
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium">Order Date:</span> {formatDate(order.created_at)}
        </div>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-gray-500" />
            Customer Information
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Customer ID</p>
              <p className="font-medium">{order.user_id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">customer@example.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-gray-500" />
            Shipping Information
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{order.shipping_address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pincode</p>
              <p className="font-medium">{order.shipping_pincode}</p>
            </div>
            {order.tracking_number && (
              <div>
                <p className="text-sm text-gray-500">Tracking Number</p>
                <p className="font-medium">{order.tracking_number}</p>
              </div>
            )}
            {order.estimated_delivery && (
              <div>
                <p className="text-sm text-gray-500">Estimated Delivery</p>
                <p className="font-medium">{formatDate(order.estimated_delivery)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-gray-500" />
            Payment Information
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-medium">{order.payment_method}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <span className={`px-2 py-1 inline-flex items-center text-xs font-medium rounded-full ${
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
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-medium text-lg">${order.total_amount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-medium flex items-center">
            <Package className="w-5 h-5 mr-2 text-gray-500" />
            Order Items
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.items && order.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {item.product_image && (
                        <div className="flex-shrink-0 h-10 w-10 mr-4">
                          <Image
                            src={item.product_image}
                            alt={item.product_name}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.product_name}</div>
                        <div className="text-sm text-gray-500">ID: {item.product_id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
              
              {/* Subtotal, Shipping, and Total */}
              <tr className="bg-gray-50">
                <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                  Subtotal
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0} items
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  ${order.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2) || '0.00'}
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                  Shipping
                </td>
                <td colSpan={1} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Standard Shipping
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  $5.00
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                  Total
                </td>
                <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-base text-gray-900 font-bold">
                  ${order.total_amount.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-medium mb-4">Update Order</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Order Status
            </label>
            <select
              id="status"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
              value={order.status}
              onChange={(e) => handleStatusUpdate(e.target.value as Order['status'])}
              disabled={isUpdating}
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700 mb-2">
              Payment Status
            </label>
            <select
              id="paymentStatus"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
              value={order.payment_status}
              onChange={(e) => handlePaymentStatusUpdate(e.target.value as Order['payment_status'])}
              disabled={isUpdating}
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
        
        {/* Additional fields for shipped orders */}
        {order.status === 'shipped' && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Tracking Number
              </label>
              <input
                type="text"
                id="trackingNumber"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Enter tracking number"
                value={order.tracking_number || ''}
                onChange={(e) => setOrder({ ...order, tracking_number: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="estimatedDelivery" className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Delivery Date
              </label>
              <input
                type="date"
                id="estimatedDelivery"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                value={order.estimated_delivery ? new Date(order.estimated_delivery).toISOString().split('T')[0] : ''}
                onChange={(e) => setOrder({ ...order, estimated_delivery: e.target.value })}
              />
            </div>
          </div>
        )}
        
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            disabled={isUpdating}
          >
            {isUpdating ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
