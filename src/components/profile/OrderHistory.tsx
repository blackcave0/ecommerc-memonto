'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Package, Truck, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/Input'; // Import Input component for search bar

interface OrderHistoryProps {
  userId: string;
}

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
}

// Mock order data
const mockOrders = [
  {
    id: '1234abcd',
    status: 'delivered',
    total_amount: 129.99,
    created_at: '2023-12-15T10:30:00Z',
    item_count: 2,
    tracking_number: 'TRK123456789',
    shipping_address: '123 Main St, Anytown, CA 12345',
    shipping_pincode: '12345',
    payment_method: 'Credit Card',
    payment_status: 'paid',
    items: [
      {
        id: 'item1',
        product_id: 'prod1',
        product_name: 'Premium Headphones',
        product_image: 'https://placehold.co/100x100',
        quantity: 1,
        price: 99.99
      },
      {
        id: 'item2',
        product_id: 'prod2',
        product_name: 'Wireless Charger',
        product_image: 'https://placehold.co/100x100',
        quantity: 1,
        price: 30.00
      }
    ]
  },
  {
    id: '5678efgh',
    status: 'shipped',
    total_amount: 49.99,
    created_at: '2024-01-20T14:45:00Z',
    item_count: 1,
    tracking_number: 'TRK987654321',
    shipping_address: '456 Oak Ave, Somewhere, NY 54321',
    shipping_pincode: '54321',
    payment_method: 'PayPal',
    payment_status: 'paid',
    items: [
      {
        id: 'item3',
        product_id: 'prod3',
        product_name: 'Bluetooth Speaker',
        product_image: 'https://placehold.co/100x100',
        quantity: 1,
        price: 49.99
      }
    ]
  }
];

export default function OrderHistory({ userId }: OrderHistoryProps) {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/orders?userId=${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleOrderClick = (orderId: string) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Package className="w-5 h-5 text-yellow-500" />;
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by Order ID"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded"
        />
      </div>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mb-2"></div>
          <p className="text-sm text-gray-500">Loading your orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <p className="text-gray-500">No orders found.</p>
        </div>
      ) : (
        filteredOrders.map(order => (
          <div key={order.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => handleOrderClick(order.id)}
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(order.status)}
                <div>
                  <p className="font-medium">Order #{order.id.substring(0, 8)}</p>
                  <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(order.total_amount)}</p>
                  <p className="text-sm text-gray-500">{order.item_count} items</p>
                </div>
                <div>
                  {expandedOrderId === order.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {expandedOrderId === order.id && (
              <div className="border-t border-gray-200 p-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <p className="text-gray-600">{order.shipping_address}</p>
                      <p className="text-gray-600">Pincode: {order.shipping_pincode}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Payment Information</h4>
                      <p className="text-gray-600">Method: {order.payment_method}</p>
                      <p className="text-gray-600">Status: {order.payment_status}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Order Items</h4>
                    <div className="space-y-2">
                      {order.items?.map((item: OrderItem) => (
                        <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <div className="flex items-center">
                            {item.product_image && (
                              <img
                                src={item.product_image}
                                alt={item.product_name}
                                className="w-12 h-12 object-cover rounded mr-3"
                              />
                            )}
                            <div>
                              <p className="font-medium">{item.product_name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {order.tracking_number && (
                    <div>
                      <h4 className="font-medium mb-2">Tracking Information</h4>
                      <div className="bg-blue-50 p-4 rounded-md">
                        <p className="text-blue-700 font-medium">Tracking Number: {order.tracking_number}</p>
                        <p className="text-blue-600 mt-1">Status: {order.status}</p>
                        <div className="mt-3">
                          <a
                            href="#"
                            className="text-blue-700 underline hover:text-blue-900"
                            onClick={(e) => {
                              e.preventDefault();
                              alert('This would open the tracking details in a real implementation');
                            }}
                          >
                            View detailed tracking information
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
/* 

  ?? order history fetched successfully .
  --implement order tracking functionality
  --implement order details functionality
  --implement order cancellation functionality
  --implement order refund functionality
  --implement order return functionality
  --implement order exchange functionality
  --implement order review functionality
  --implement order feedback functionality
  --implement order rating functionality
  --implement order comment functionality
  --implement order reply functionality

  ## for admin 
  --implement order management functionality
  --implement order tracking functionality
  --implement order details functionality
  --implement order cancellation functionality
  --implement order refund functionality
  --implement order return functionality
  --implement order exchange functionality
  --implement order review functionality
  --implement order feedback functionality
  --implement order rating functionality
  --implement order comment functionality
  --implement order reply functionality

*/