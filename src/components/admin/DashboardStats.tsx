'use client';

import { DashboardStats as DashboardStatsType } from '@/types/admin';
import { 
  ShoppingBag, 
  DollarSign, 
  Users, 
  Clock,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface DashboardStatsProps {
  stats: DashboardStatsType;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: <ShoppingBag className="w-6 h-6 text-blue-500" />,
      change: '+12.5%',
      trend: 'up',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
      change: '+8.2%',
      trend: 'up',
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: <Users className="w-6 h-6 text-purple-500" />,
      change: '+5.3%',
      trend: 'up',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: <Clock className="w-6 h-6 text-amber-500" />,
      change: '-2.1%',
      trend: 'down',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => (
        <div 
          key={index}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
            </div>
            <div className="p-2 rounded-full bg-gray-50">
              {card.icon}
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {card.trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${card.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {card.change} from last month
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
