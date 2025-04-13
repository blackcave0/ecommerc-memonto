'use client';

import { PaymentMethodStats } from '@/types/admin';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

interface PaymentMethodsChartProps {
  data: PaymentMethodStats[];
  title?: string;
}

export function PaymentMethodsChart({ data, title = 'Payment Methods' }: PaymentMethodsChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-medium mb-6">{title}</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="method" 
              tick={{ fontSize: 12 }} 
              tickMargin={10}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickMargin={10}
            />
            <Tooltip 
              formatter={(value) => [value, 'Orders']}
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}
            />
            <Legend />
            <Bar 
              dataKey="count" 
              name="Orders" 
              fill="var(--chart-2)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
