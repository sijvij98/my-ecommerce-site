"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

export default function CartSidebar() {
  const { items, subtotal, isCartOpen, closeCart, setQty, removeItem } = useCart();

  return (
    <>
      <div
        className={`cart-overlay ${isCartOpen ? "show" : ""}`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside className={`cart-sidebar ${isCartOpen ? "open" : ""}`} aria-label="Shopping cart">
        <div className="cart-sidebar-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={closeCart} aria-label="Close cart">
            &times;
          </button>
        </div>

        <div className="cart-sidebar-items">
          {items.length === 0 ? (
            <p className="empty-cart-msg">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <div className="cart-item-title">{item.name}</div>
                  <div className="cart-item-price">{formatPrice(item.price)}</div>
                  <div className="cart-item-controls">
                    <button
                      className="qty-btn"
                      onClick={() => setQty(item.id, item.qty - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => setQty(item.id, item.qty + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-sidebar-footer">
          <div className="cart-total-row">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <p className="shipping-note">Shipping &amp; taxes calculated at checkout.</p>
          <Link href="/checkout" className="btn btn-success btn-block" onClick={closeCart}>
            Checkout
          </Link>
          <Link href="/cart" className="btn btn-outline btn-block" onClick={closeCart}>
            View Full Cart
          </Link>
        </div>
      </aside>
    </>
  );
}
