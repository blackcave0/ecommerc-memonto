'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminOrdersPage() {
  const router = useRouter();

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
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '32px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Orders Management</h1>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link href="/admin" style={{
              padding: '8px 16px',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              Dashboard
            </Link>
            <Link href="/admin/payments" style={{
              padding: '8px 16px',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              Payments
            </Link>
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

        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Search orders..."
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
            <select style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Order ID</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Customer</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Amount</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '12px 16px' }}>#1234abcd</td>
              <td style={{ padding: '12px 16px' }}>customer@example.com</td>
              <td style={{ padding: '12px 16px' }}>Jun 1, 2023</td>
              <td style={{ padding: '12px 16px' }}>$129.99</td>
              <td style={{ padding: '12px 16px' }}>
                <span style={{ backgroundColor: '#fff7ed', color: '#ea580c', padding: '2px 8px', borderRadius: '9999px', fontSize: '12px' }}>
                  Pending
                </span>
              </td>
              <td style={{ padding: '12px 16px' }}>
                <select style={{
                  padding: '4px 8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '12px 16px' }}>#5678efgh</td>
              <td style={{ padding: '12px 16px' }}>john.doe@example.com</td>
              <td style={{ padding: '12px 16px' }}>May 30, 2023</td>
              <td style={{ padding: '12px 16px' }}>$89.99</td>
              <td style={{ padding: '12px 16px' }}>
                <span style={{ backgroundColor: '#ecfdf5', color: '#059669', padding: '2px 8px', borderRadius: '9999px', fontSize: '12px' }}>
                  Delivered
                </span>
              </td>
              <td style={{ padding: '12px 16px' }}>
                <select style={{
                  padding: '4px 8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered" selected>Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '12px 16px' }}>#9012ijkl</td>
              <td style={{ padding: '12px 16px' }}>jane.smith@example.com</td>
              <td style={{ padding: '12px 16px' }}>May 29, 2023</td>
              <td style={{ padding: '12px 16px' }}>$199.99</td>
              <td style={{ padding: '12px 16px' }}>
                <span style={{ backgroundColor: '#f0f9ff', color: '#0284c7', padding: '2px 8px', borderRadius: '9999px', fontSize: '12px' }}>
                  Shipped
                </span>
              </td>
              <td style={{ padding: '12px 16px' }}>
                <select style={{
                  padding: '4px 8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped" selected>Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link href="/admin" style={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: 'black',
            color: 'white',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '14px',
            marginRight: '8px'
          }}>
            Back to Dashboard
          </Link>
          <Link href="/" style={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            Return to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
