"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { CartItem } from "@/types/cart";

const CART_KEY = "mc_guest_cart";

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (item: Omit<CartItem, "key" | "quantity"> & { quantity?: number }) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setItems(loadCart());
  }, []);

  const count = items.reduce((acc, i) => acc + i.quantity, 0);
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const addItem = useCallback(
    (incoming: Omit<CartItem, "key" | "quantity"> & { quantity?: number }) => {
      const key = incoming.variantId
        ? `${incoming.productId}::${incoming.variantId}`
        : incoming.productId;
      const qty = incoming.quantity ?? 1;

      setItems((prev) => {
        const idx = prev.findIndex((i) => i.key === key);
        let next: CartItem[];
        if (idx >= 0) {
          next = prev.map((item: any, i: number) =>
            i === idx
              ? { ...item, quantity: Math.min(item.stock, item.quantity + qty) }
              : item
          );
        } else {
          next = [...prev, { ...incoming, key, quantity: qty }];
        }
        saveCart(next);
        return next;
      });
    },
    []
  );

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) => {
      let next: CartItem[];
      if (quantity <= 0) {
        next = prev.filter((i) => i.key !== key);
      } else {
        next = prev.map((i: any) =>
          i.key === key ? { ...i, quantity: Math.min(i.stock, quantity) } : i
        );
      }
      saveCart(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.key !== key);
      saveCart(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    localStorage.removeItem(CART_KEY);
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        total,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
