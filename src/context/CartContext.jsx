"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "../data/products";

const CartContext = createContext(null);
const STORAGE_KEY = "urbaniq-cart-v1";

const keyOf = (id, size) => `${id}__${size}`;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{id, size, qty}]
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {}
    }
  }, [items, loaded]);

  const addItem = (id, size = "M", qty = 1) => {
    const key = keyOf(id, size);
    setItems((prev) => {
      const found = prev.find((i) => keyOf(i.id, i.size) === key);
      if (found) {
        return prev.map((i) =>
          keyOf(i.id, i.size) === key ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { id, size, qty }];
    });
    setIsOpen(true);
  };

  const updateQty = (id, size, qty) => {
    const key = keyOf(id, size);
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => keyOf(i.id, i.size) !== key)
        : prev.map((i) => (keyOf(i.id, i.size) === key ? { ...i, qty } : i))
    );
  };

  const removeItem = (id, size) => {
    const key = keyOf(id, size);
    setItems((prev) => prev.filter((i) => keyOf(i.id, i.size) !== key));
  };

  const clear = () => setItems([]);

  const detailed = useMemo(
    () =>
      items
        .map((i) => ({ ...i, product: getProduct(i.id) }))
        .filter((i) => i.product),
    [items]
  );

  const count = useMemo(
    () => detailed.reduce((s, i) => s + i.qty, 0),
    [detailed]
  );
  const subtotal = useMemo(
    () => detailed.reduce((s, i) => s + i.qty * i.product.price, 0),
    [detailed]
  );

  return (
    <CartContext.Provider
      value={{
        items: detailed,
        addItem,
        updateQty,
        removeItem,
        clear,
        count,
        subtotal,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
