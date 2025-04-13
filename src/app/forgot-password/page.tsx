'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Header } from '@/components/home/Header';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { resetPassword, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    
    try {
      await resetPassword(email);
      setSuccessMessage('Password reset instructions have been sent to your email');
      setEmail('');
    } catch (error) {
      console.error('Reset password error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-3 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-3 sm:py-4 md:py-6 lg:py-8">
      <Header />
      
      <div className="max-w-md mx-auto mt-8 sm:mt-12 md:mt-16 lg:mt-20">
        <h1 className="text-3xl font-medium mb-8 text-center">Reset Password</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="bg-green-50 text-green-600 p-4 rounded-md mb-6">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-70"
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Remember your password?{' '}
            <Link href="/login" className="text-black font-medium hover:underline">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
