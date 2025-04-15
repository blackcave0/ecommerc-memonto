'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Header } from '@/components/home/Header';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart.items }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
        // return;
      } else {
        alert('Failed to initiate checkout.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white px-3 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-3 sm:py-4 md:py-6 lg:py-8">
        <Header />

        <div className="max-w-6xl mx-auto mt-8 sm:mt-12 md:mt-16">
          <h1 className="text-3xl font-medium mb-8">Checkout</h1>

          {cart.items.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Add some items to your cart to proceed with checkout.</p>
              <Link
                href="/shop"
                className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-medium mb-6">Order Summary</h2>

                  <div className="space-y-6">
                    {cart.items.map(item => (
                      <div key={item.id} className="flex border-b pb-6">
                        {/* Product Image */}
                        <div className="w-24 h-24 relative flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <Link
                              href={`/product/${item.slug}`}
                              className="font-medium hover:underline"
                            >
                              {item.name}
                            </Link>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-gray-600"
                              aria-label="Remove item"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-sm text-gray-500 mt-1">
                            {item.size && <span className="mr-2">Size: {item.size}</span>}
                            {item.color && <span>Color: {item.color}</span>}
                          </div>

                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center border rounded-md">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-1 text-gray-500 hover:text-black"
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 py-1 text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 text-gray-500 hover:text-black"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="font-medium">{item.price}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                  <h2 className="text-xl font-medium mb-6">Payment Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{cart.totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>$0.00</span>
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>{cart.totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-70"
                  >
                    {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                  </button>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    This is a demo checkout. No actual payment will be processed.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
