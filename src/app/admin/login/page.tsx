'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../admin.css';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e : any) => {
    e.preventDefault();
    
    // Simple validation
    if (email === 'admin@example.com' && password === 'admin123') {
      // Store token in localStorage
      localStorage.setItem('adminToken', 'demo-admin-token');
      // Redirect to admin dashboard
      router.push('/admin');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="admin-login">
      <h1>Admin Login</h1>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn">
          Sign in
        </button>
      </form>
      
      <div>
        <a href="/" className="back-link">Return to website</a>
      </div>
    </div>
  );
}
