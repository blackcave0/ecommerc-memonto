'use client';

import { CategorySales } from '@/types/admin';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

interface CategoryChartProps {
  data: CategorySales[];
  title?: string;
}

export function CategoryChart({ data, title = 'Sales by Category' }: CategoryChartProps) {
  // Colors for the pie chart
  const COLORS = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)',
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-medium mb-6">{title}</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="amount"
              nameKey="category"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}
            />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              formatter={(value, entry, index) => (
                <span className="text-sm font-medium">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <div className="flex justify-between w-full">
              <span className="text-sm font-medium">{item.category}</span>
              <span className="text-sm font-medium">${item.amount.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
