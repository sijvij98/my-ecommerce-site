"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { count, openCart } = useCart();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="logo">
          Shop<span>Next</span>
        </Link>
        <nav className="main-nav">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
        </nav>
        <button className="cart-icon-btn" onClick={openCart} aria-label="Open cart">
          🛒
          {count > 0 && <span className="cart-badge">{count}</span>}
        </button>
      </div>
    </header>
  );
}
