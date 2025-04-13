'use client';

import { Cart, CartItem } from '@/types/cart';

// Default empty cart
const defaultCart: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: '$0.00',
};

// Load cart from localStorage
export const loadCart = (): Cart => {
  if (typeof window === 'undefined') {
    return defaultCart;
  }
  
  try {
    const cartData = localStorage.getItem('cart');
    if (!cartData) return defaultCart;
    
    const cart = JSON.parse(cartData) as Cart;
    return cart;
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return defaultCart;
  }
};

// Save cart to localStorage
export const saveCart = (cart: Cart): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Calculate total price from cart items
export const calculateTotalPrice = (items: CartItem[]): string => {
  const total = items.reduce((sum, item) => {
    // Remove currency symbol and convert to number
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return sum + (price * item.quantity);
  }, 0);
  
  // Format as currency
  return `$${total.toFixed(2)}`;
};

// Generate a unique ID for cart items
export const generateCartItemId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};
