import { Product } from './product';

export interface CartItem {
  id: string; // Unique identifier for the cart item
  productId: number;
  slug: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  size?: string | null;
  color?: string | null;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: string;
}

export interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity: number, size?: string | null, color?: string | null) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}
