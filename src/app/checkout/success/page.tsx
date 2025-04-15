'use client';

import { useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const { clearCart, cart } = useCart();
  const { user } = useAuth();
  const hasExecuted = useRef(false); // Track if the function has already executed

  useEffect(() => {
    const verifyAndSaveOrder = async () => {
      if (!user || hasExecuted.current) return; // Ensure user is loaded and function is not executed multiple times

      const sessionId = searchParams.get('session_id');
      if (!sessionId) {
        console.error('No session_id found in query parameters.');
        return;
      }

      hasExecuted.current = true; // Mark as executed to prevent re-triggering

      try {
        // Verify payment
        const verifyResponse = await fetch(`/api/verify-payment?session_id=${sessionId}`);
        const verifyData = await verifyResponse.json();

        if (!verifyResponse.ok || verifyData.payment_status !== 'paid') {
          console.error('Payment verification failed:', verifyData);
          return;
        }

        // Save order
        const saveOrderResponse = await fetch('/api/save-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            stripeSessionId: sessionId,
            userId: user.id,
            order: {
              id: verifyData.order_id,
              total_amount: parseFloat(cart.totalPrice.replace(/[^0-9.-]+/g, '')), // Ensure total_amount is a valid number
              shipping_address: {
                street: user.address || 'Unknown Street',
                city: 'Unknown City',
                state: 'Unknown State',
                country: 'Unknown Country',
                postal_code: user.pincode || '00000',
              },
              shipping_pincode: user.pincode || '00000',
              payment_method: 'Credit Card',
            },
            items: cart.items.map((item) => ({
              product_id: item.productId,
              product_name: item.name,
              product_image: item.image,
              quantity: item.quantity,
              price: parseFloat(item.price.replace(/[^0-9.-]+/g, '')), // Ensure price is a valid number
            })),
          }),
        });

        const saveOrderData = await saveOrderResponse.json();

        if (!saveOrderResponse.ok || !saveOrderData.success) {
          console.error('Failed to save order:', saveOrderData.error);
          return;
        }

        // Clear cart after successful order save
        clearCart();

        console.log('Order saved successfully:', saveOrderData);
      } catch (error) {
        console.error('Error during payment verification or order saving:', error);
      }
    };

    verifyAndSaveOrder();
  }, [searchParams, cart, user, clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Payment Successful!</h1>
        <p className="mt-4 text-gray-600">Your order has been placed successfully.</p>
        <button
          onClick={() => window.location.href = '/'}
          className="mt-6 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}