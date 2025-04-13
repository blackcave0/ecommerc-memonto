'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Cart, CartContextType, CartItem } from '@/types/cart';
import { Product } from '@/types/product';
import { loadCart, saveCart, calculateTotalPrice, generateCartItemId } from '@/lib/cartStorage';

// Default empty cart
const defaultCart: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: '$0.00',
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(defaultCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize cart from localStorage
  useEffect(() => {
    const savedCart = loadCart();
    setCart(savedCart);
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      saveCart(cart);
    }
  }, [cart, isInitialized]);

  // Add item to cart
  const addToCart = (product: Product, quantity: number, size?: string | null, color?: string | null) => {
    setCart(prevCart => {
      // Check if the item already exists in the cart with the same options
      const existingItemIndex = prevCart.items.findIndex(
        item => 
          item.productId === product.id && 
          item.size === size && 
          item.color === color
      );

      let newItems;

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        newItems = [...prevCart.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
      } else {
        // Add new item if it doesn't exist
        const newItem: CartItem = {
          id: generateCartItemId(),
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          size,
          color,
        };
        newItems = [...prevCart.items, newItem];
      }

      // Calculate new totals
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = calculateTotalPrice(newItems);

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.id !== itemId);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = calculateTotalPrice(newItems);

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    });
  };

  // Update item quantity
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;

    setCart(prevCart => {
      const newItems = prevCart.items.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      );
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = calculateTotalPrice(newItems);

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart(defaultCart);
  };

  // Context value
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
