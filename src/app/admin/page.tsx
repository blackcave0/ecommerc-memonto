'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiHomeAlt, BiPackage, BiCart, BiUser, BiNews, BiCog, BiAnalyse, BiStore, BiTag } from 'react-icons/bi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function AdminDashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState([
    { id: '#1234abcd', customer: 'customer@example.com', date: 'Jun 1, 2023', amount: '$129.99', status: 'pending' },
    { id: '#5678efgh', customer: 'john.doe@example.com', date: 'May 30, 2023', amount: '$89.99', status: 'delivered' },
    { id: '#9012ijkl', customer: 'jane.smith@example.com', date: 'May 29, 2023', amount: '$199.99', status: 'shipped' },
  ]);

  const [salesData] = useState({
    income: 23262.00,
    expenses: 11135.00,
    balance: 48135.00,
    dailyTarget: 650,
    monthlyTarget: 14500,
    targetProgress: 75
  });

  const [chartData] = useState([
    { date: '21 July', value: 30 },
    { date: '22 July', value: 45 },
    { date: '23 July', value: 35 },
    { date: '24 July', value: 50 },
    { date: '25 July', value: 40 },
    { date: '26 July', value: 55 },
    { date: '27 July', value: 45 },
    { date: '28 July', value: 60 },
  ]);

  // Verify authentication on page load
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f9fafb',
      color: isDarkMode ? '#ffffff' : '#111827'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '240px',
        backgroundColor: isDarkMode ? '#2d2d2d' : 'white',
        padding: '24px',
        borderRight: `1px solid ${isDarkMode ? '#404040' : '#e5e7eb'}`
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Pixel Commerce</h1>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { icon: <BiHomeAlt />, label: 'Dashboard', href: '/admin' },
            { icon: <BiAnalyse />, label: 'Analytics', href: '/admin/analytics' },
            { icon: <BiPackage />, label: 'Products', href: '/admin/products' },
            { icon: <BiTag />, label: 'Offers', href: '/admin/offers' },
            { icon: <BiStore />, label: 'Inventory', href: '/admin/inventory' },
            { icon: <BiCart />, label: 'Orders', href: '/admin/orders' },
            { icon: <BiAnalyse />, label: 'Sales', href: '/admin/sales' },
            { icon: <BiUser />, label: 'Customer', href: '/admin/customers' },
            { icon: <BiNews />, label: 'Newsletter', href: '/admin/newsletter' },
            { icon: <BiCog />, label: 'Settings', href: '/admin/settings' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 12px',
                borderRadius: '6px',
                backgroundColor: pathname === item.href ? (isDarkMode ? '#404040' : '#f3f4f6') : 'transparent',
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '24px' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Overview</h1>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: isDarkMode ? '#404040' : '#f3f4f6',
                cursor: 'pointer'
              }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            <button
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                textDecoration: 'none',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <div style={{ padding: '16px', backgroundColor: isDarkMode ? '#2d2d2d' : '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Total Orders</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>256</p>
          </div>

          <div style={{ padding: '16px', backgroundColor: isDarkMode ? '#2d2d2d' : '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Total Revenue</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>$28,945.75</p>
          </div>

          <div style={{ padding: '16px', backgroundColor: isDarkMode ? '#2d2d2d' : '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Pending Orders</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>12</p>
          </div>

          <div style={{ padding: '16px', backgroundColor: isDarkMode ? '#2d2d2d' : '#f5f3ff', borderRadius: '8px', border: '1px solid #ddd6fe' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Total Customers</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>189</p>
          </div>
        </div>

        {/* Sales Analytics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{
            backgroundColor: isDarkMode ? '#2d2d2d' : 'white',
            borderRadius: '8px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Sales Analytics</h2>
              <select
                style={{
                  padding: '4px 8px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                <option>Jul 2023</option>
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <p style={{ color: '#6b7280', marginBottom: '4px' }}>Income</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
                  ${salesData.income.toLocaleString()}
                  <span style={{ fontSize: '12px', color: '#10b981', marginLeft: '4px' }}>↑</span>
                </p>
              </div>
              <div>
                <p style={{ color: '#6b7280', marginBottom: '4px' }}>Expenses</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444' }}>
                  ${salesData.expenses.toLocaleString()}
                  <span style={{ fontSize: '12px', color: '#ef4444', marginLeft: '4px' }}>↓</span>
                </p>
              </div>
              <div>
                <p style={{ color: '#6b7280', marginBottom: '4px' }}>Balance</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  ${salesData.balance.toLocaleString()}
                </p>
              </div>
            </div>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{
            backgroundColor: isDarkMode ? '#2d2d2d' : 'white',
            borderRadius: '8px',
            padding: '24px'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>Sales Target</h2>
            <div style={{ width: '200px', margin: '0 auto', marginBottom: '24px' }}>
              <CircularProgressbar
                value={salesData.targetProgress}
                text={`${salesData.targetProgress}%`}
                styles={buildStyles({
                  pathColor: '#10b981',
                  textColor: isDarkMode ? '#fff' : '#111827',
                  trailColor: '#e5e7eb'
                })}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '16px' }}>
                <p style={{ color: '#6b7280', marginBottom: '4px' }}>Daily Target</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>${salesData.dailyTarget}</p>
              </div>
              <div>
                <p style={{ color: '#6b7280', marginBottom: '4px' }}>Monthly Target</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>${salesData.monthlyTarget}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div style={{
          backgroundColor: isDarkMode ? '#2d2d2d' : 'white',
          borderRadius: '8px',
          padding: '24px'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Recent Orders</h2>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                width: '300px'
              }}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px'
              }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: isDarkMode ? '#404040' : '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Order ID</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Customer</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Date</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Amount</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px 16px' }}>{order.id}</td>
                  <td style={{ padding: '12px 16px' }}>{order.customer}</td>
                  <td style={{ padding: '12px 16px' }}>{order.date}</td>
                  <td style={{ padding: '12px 16px' }}>{order.amount}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      backgroundColor: order.status === 'pending' ? '#fff7ed' :
                        order.status === 'delivered' ? '#ecfdf5' : '#f0f9ff',
                      color: order.status === 'pending' ? '#ea580c' :
                        order.status === 'delivered' ? '#059669' : '#0284c7',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      fontSize: '12px'
                    }}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{
                        padding: '4px 8px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}
                    >
                      <option value="pending">Set Pending</option>
                      <option value="shipped">Set Shipped</option>
                      <option value="delivered">Set Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
