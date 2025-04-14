'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true); // New state for loading spinner
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      console.warn('No session_id found in the URL');
      setIsPaymentSuccessful(false);
      setIsVerifying(false); // Stop spinner if no session_id
      return;
    }

    const verifyPayment = async () => {
      try {
        console.log('Verifying session ID with backend:', sessionId);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(`/api/verify-payment?session_id=${sessionId}`, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          console.error('API request failed with status:', response.status);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Backend response data:', data);

        if (data.payment_status === 'paid') {
          console.log('Payment verified successfully.');
          setIsPaymentSuccessful(true);
        } else {
          console.error('Payment verification failed. Status:', data.payment_status, 'Data:', data);
          setIsPaymentSuccessful(false);
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.error('Payment verification request timed out');
        } else {
          console.error('Error verifying payment:', error);
        }
        setIsPaymentSuccessful(false);
      } finally {
        setIsVerifying(false); // Stop spinner after verification
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (isVerifying) {
    // Custom loading spinner
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Verifying payment...</p>
        </div>
      </div>
    );
  }

  if (!isPaymentSuccessful) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-red-600 mb-4">Payment Verification Failed</h1>
          <p className="text-gray-600 mb-6">
            We couldn't verify your payment. Please check your email or contact support if you believe this is an error.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  } else if (isPaymentSuccessful) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 text-center">
          <h1 className="text-2xl font-medium text-green-600 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been successfully processed. A confirmation email is on its way.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
}