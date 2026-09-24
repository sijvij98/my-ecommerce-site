"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { count, setIsOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/products?gender=women", label: "Women" },
    { href: "/products?gender=men", label: "Men" },
    { href: "/products", label: "All Clothing" },
  ];

  const isActive = (href) => {
    if (href === "/products") return pathname === "/products";
    return false;
  };

  return (
    <>
      <div className="announce">
        Complimentary shipping across India on orders over ₹4,999
      </div>
      <header className="header">
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label="Urbaniq home">
            <img src="/logo.png" alt="Urbaniq logo" className="brand-mark" />
            <span>
              <span className="brand-name">
                URBAN<span>IQ</span>
              </span>
              <span className="brand-tag" style={{ display: "block" }}>
                Wear your story
              </span>
            </span>
          </Link>

          <nav className={`nav ${menuOpen ? "mobile-open" : ""}`}>
            {links.map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                className={isActive(l.href) ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link
              href="/products"
              className="icon-btn"
              aria-label="Search"
              title="Search"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
              </svg>
            </Link>
            <button
              className="icon-btn"
              aria-label="Open bag"
              title="Shopping bag"
              onClick={() => setIsOpen(true)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  d="M6 8h15l-1.5 12.5a1 1 0 0 1-1 .5H5.5a1 1 0 0 1-1-.5L3 8h3z"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 10V6a3 3 0 0 1 6 0v4"
                  strokeLinecap="round"
                />
              </svg>
              {count > 0 && <span className="cart-count">{count}</span>}
            </button>
            <button
              className="icon-btn menu-btn"
              aria-label="Menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
