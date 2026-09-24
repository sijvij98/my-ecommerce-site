"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice, FREE_SHIPPING_THRESHOLD } from "@/data/products";

export default function CartPage() {
  const { items, subtotal, shipping, total, setQty, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="container section" style={{ textAlign: "center" }}>
        <h1 className="section-title">Your Cart is Empty</h1>
        <p className="section-subtitle">Looks like you have not added anything yet.</p>
        <Link href="/products" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  const awayFromFree = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="container section">
      <h1 className="section-title" style={{ textAlign: "left", marginBottom: "2rem" }}>
        Shopping Cart ({items.length} {items.length === 1 ? "item" : "items"})
      </h1>

      <div className="cart-page-grid">
        <div>
          {items.map((item) => (
            <div className="cart-line" key={item.id}>
              <Link href={`/products/${item.id}`}>
                <img src={item.image} alt={item.name} />
              </Link>
              <div>
                <Link href={`/products/${item.id}`} className="cart-line-title" style={{ textDecoration: "none" }}>
                  {item.name}
                </Link>
                <div className="cart-line-unit">{formatPrice(item.price)} each</div>
                <div className="cart-item-controls" style={{ marginTop: "0.6rem" }}>
                  <button className="qty-btn" onClick={() => setQty(item.id, item.qty - 1)} aria-label="Decrease quantity">
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button className="qty-btn" onClick={() => setQty(item.id, item.qty + 1)} aria-label="Increase quantity">
                    +
                  </button>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
              <div className="cart-line-right">
                <div className="cart-line-total">{formatPrice(item.price * item.qty)}</div>
              </div>
            </div>
          ))}
          <Link href="/products" className="btn btn-outline" style={{ marginTop: "1rem" }}>
            ← Continue Shopping
          </Link>
        </div>

        <div className="summary-card">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className={shipping === 0 ? "free-shipping" : ""}>
              {shipping === 0 ? "FREE" : formatPrice(shipping)}
            </span>
          </div>
          {awayFromFree > 0 && (
            <p style={{ fontSize: "0.85rem", color: "#777", marginBottom: "0.6rem" }}>
              Add {formatPrice(awayFromFree)} more for free shipping 🚚
            </p>
          )}
          <div className="summary-row grand">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Link href="/checkout" className="btn btn-success btn-block">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
