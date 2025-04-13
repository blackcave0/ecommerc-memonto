'use client';

import { useState, useEffect } from 'react';
import { getOrderTracking } from '@/services/orderService';
import { Truck, Package, CheckCircle, Clock } from 'lucide-react';

interface OrderTrackerProps {
  trackingNumber: string;
}

interface TrackingStatus {
  status: string;
  location: string;
  timestamp: string;
}

interface TrackingInfo {
  trackingNumber: string;
  status: string;
  estimatedDelivery: string;
  trackingHistory: TrackingStatus[];
}

export default function OrderTracker({ trackingNumber }: OrderTrackerProps) {
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrackingInfo() {
      try {
        setIsLoading(true);
        const data = await getOrderTracking(trackingNumber);
        setTrackingInfo(data as TrackingInfo);
      } catch (err) {
        setError('Failed to load tracking information');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (trackingNumber) {
      fetchTrackingInfo();
    }
  }, [trackingNumber]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !trackingInfo) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-md">
        {error || 'Tracking information not available'}
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'order_placed':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'processing':
        return <Package className="w-5 h-5 text-yellow-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'in_transit':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Tracking #{trackingInfo.trackingNumber}</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {trackingInfo.status.replace('_', ' ')}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Estimated delivery: <span className="font-medium">{formatDate(trackingInfo.estimatedDelivery)}</span>
        </p>
      </div>

      <div className="space-y-4">
        {trackingInfo.trackingHistory.map((event, index) => (
          <div key={index} className="flex items-start">
            <div className="mr-3 mt-1">{getStatusIcon(event.status)}</div>
            <div className="flex-1">
              <p className="font-medium capitalize">{event.status.replace('_', ' ')}</p>
              <p className="text-sm text-gray-600">{event.location}</p>
              <p className="text-xs text-gray-500">{formatDate(event.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
