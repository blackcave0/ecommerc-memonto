'use client';

import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface CartIconProps {
  className?: string;
}

export function CartIcon({ className = '' }: CartIconProps) {
  const { cart, setIsCartOpen } = useCart();
  
  return (
    <button 
      className={`relative ${className}`}
      onClick={() => setIsCartOpen(true)}
      aria-label="Open cart"
    >
      <ShoppingBag className="w-5 h-5" />
      {cart.totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {cart.totalItems > 99 ? '99+' : cart.totalItems}
        </span>
      )}
    </button>
  );
}
