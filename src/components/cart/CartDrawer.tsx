'use client';

import { useCart } from '@/context/CartContext';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useCart();

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsCartOpen(false)}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-xl overflow-y-auto"
          >
            <div className="p-4 h-full flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-xl font-medium">Your Cart</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-4">
                {cart.items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <ShoppingBag className="w-16 h-16 mb-4 opacity-30" />
                    <p className="text-lg mb-2">Your cart is empty</p>
                    <p className="text-sm mb-6">Add items to get started</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {cart.items.map(item => (
                      <li key={item.id} className="flex border-b pb-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 relative flex-shrink-0">
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
                              onClick={() => setIsCartOpen(false)}
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
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              {/* Footer */}
              {cart.items.length > 0 && (
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-medium">{cart.totalPrice}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Shipping and taxes calculated at checkout
                  </p>
                  <Link 
                    href="/checkout"
                    className="block w-full bg-black text-white text-center py-3 rounded-md hover:bg-gray-800 transition-colors"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Checkout
                  </Link>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="block w-full text-center py-3 mt-2 text-gray-600 hover:text-black transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
