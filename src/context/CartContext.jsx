"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { getProductById, FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT_RATE } from "@/data/products";

const CartContext = createContext(null);
const STORAGE_KEY = "ecommerce-nextjs-cart";

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { id, qty = 1 } = action.payload;
      const existing = state.find((item) => item.id === id);
      if (existing) {
        return state.map((item) =>
          item.id === id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...state, { id, qty }];
    }
    case "SET_QTY": {
      const { id, qty } = action.payload;
      if (qty <= 0) return state.filter((item) => item.id !== id);
      return state.map((item) => (item.id === id ? { ...item, qty } : item));
    }
    case "REMOVE":
      return state.filter((item) => item.id !== action.payload.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

function loadInitialCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Keep only items that still exist in the catalog
    return Array.isArray(parsed)
      ? parsed.filter((i) => i && getProductById(i.id) && Number(i.qty) > 0)
      : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadInitialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable — cart still works in memory
    }
  }, [items]);

  const detailedItems = useMemo(
    () =>
      items
        .map((item) => ({ ...getProductById(item.id), qty: item.qty }))
        .filter((item) => item && item.id),
    [items]
  );

  const subtotal = useMemo(
    () => detailedItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [detailedItems]
  );

  const count = useMemo(
    () => detailedItems.reduce((sum, item) => sum + item.qty, 0),
    [detailedItems]
  );

  const shipping = useMemo(() => {
    if (detailedItems.length === 0) return 0;
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  }, [detailedItems, subtotal]);

  const total = subtotal + shipping;

  const value = {
    items: detailedItems,
    count,
    subtotal,
    shipping,
    total,
    isCartOpen,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    addItem: (id, qty = 1) => dispatch({ type: "ADD", payload: { id: String(id), qty } }),
    setQty: (id, qty) => dispatch({ type: "SET_QTY", payload: { id: String(id), qty } }),
    removeItem: (id) => dispatch({ type: "REMOVE", payload: { id: String(id) } }),
    clearCart: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
