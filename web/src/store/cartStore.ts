import { create } from 'zustand';
import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

interface CartState {
  cartItems: CartItem[];
  subtotal: number;
  discount: number;
  deliveryCharges: number;
  totalAmount: number;
  totalItems: number;
  
  addItem: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeItem: (productId: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;
}

const calculateTotals = (items: CartItem[]) => {
  let subtotal = 0;
  let discount = 0;
  let totalItems = 0;

  items.forEach(item => {
    subtotal += item.product.originalPrice * item.quantity;
    discount += (item.product.originalPrice - item.product.price) * item.quantity;
    totalItems += item.quantity;
  });

  const actualSubtotal = subtotal - discount; // What they pay for products
  const deliveryCharges = actualSubtotal > 499 || actualSubtotal === 0 ? 0 : 49;
  const totalAmount = actualSubtotal + deliveryCharges;

  return {
    subtotal,
    discount,
    deliveryCharges,
    totalAmount,
    totalItems
  };
};

// Try to load initial cart from localStorage
const getInitialCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem('zoptavi_cart');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const useCartStore = create<CartState>((set) => {
  const initialItems = getInitialCart();
  const totals = calculateTotals(initialItems);

  return {
    cartItems: initialItems,
    ...totals,

    addItem: (product, quantity = 1, selectedColor) => {
      set((state) => {
        const existingIndex = state.cartItems.findIndex(
          (item) => item.product.id === product.id && item.selectedColor === selectedColor
        );

        let newItems = [...state.cartItems];

        if (existingIndex > -1) {
          newItems[existingIndex] = {
            ...newItems[existingIndex],
            quantity: newItems[existingIndex].quantity + quantity
          };
        } else {
          newItems.push({ product, quantity, selectedColor });
        }

        localStorage.setItem('zoptavi_cart', JSON.stringify(newItems));
        return {
          cartItems: newItems,
          ...calculateTotals(newItems)
        };
      });
    },

    removeItem: (productId, selectedColor) => {
      set((state) => {
        const newItems = state.cartItems.filter(
          (item) => !(item.product.id === productId && item.selectedColor === selectedColor)
        );
        localStorage.setItem('zoptavi_cart', JSON.stringify(newItems));
        return {
          cartItems: newItems,
          ...calculateTotals(newItems)
        };
      });
    },

    updateQuantity: (productId, quantity, selectedColor) => {
      set((state) => {
        if (quantity <= 0) {
          const newItems = state.cartItems.filter(
            (item) => !(item.product.id === productId && item.selectedColor === selectedColor)
          );
          localStorage.setItem('zoptavi_cart', JSON.stringify(newItems));
          return {
            cartItems: newItems,
            ...calculateTotals(newItems)
          };
        }

        const newItems = state.cartItems.map((item) => {
          if (item.product.id === productId && item.selectedColor === selectedColor) {
            return { ...item, quantity };
          }
          return item;
        });

        localStorage.setItem('zoptavi_cart', JSON.stringify(newItems));
        return {
          cartItems: newItems,
          ...calculateTotals(newItems)
        };
      });
    },

    clearCart: () => {
      localStorage.removeItem('zoptavi_cart');
      set({
        cartItems: [],
        subtotal: 0,
        discount: 0,
        deliveryCharges: 0,
        totalAmount: 0,
        totalItems: 0
      });
    }
  };
});
