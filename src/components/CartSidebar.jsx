"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { inr, FREE_SHIPPING_THRESHOLD } from "../data/products";

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, updateQty, removeItem, subtotal, count } =
    useCart();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={`cart-drawer ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="cart-head">
          <h3>
            Your Bag <span>({count})</span>
          </h3>
          <button
            className="icon-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close bag"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <span className="big">👜</span>
              <h4 className="serif" style={{ fontSize: "1.3rem", marginBottom: 8 }}>
                Your bag is empty
              </h4>
              <p style={{ fontSize: "0.9rem" }}>
                Beautiful things await. Start with our bestsellers.
              </p>
              <Link
                href="/products"
                className="btn btn-gold"
                style={{ marginTop: 22 }}
                onClick={() => setIsOpen(false)}
              >
                Shop Now
              </Link>
            </div>
          ) : (
            items.map((i) => (
              <div className="cart-line" key={`${i.id}__${i.size}`}>
                <Link
                  href={`/products/${i.id}`}
                  onClick={() => setIsOpen(false)}
                >
                  <img src={i.product.image} alt={i.product.name} />
                </Link>
                <div>
                  <h4>{i.product.name}</h4>
                  <div className="variant">Size {i.size}</div>
                  <div className="row">
                    <span className="mini-qty">
                      <button
                        onClick={() => updateQty(i.id, i.size, i.qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{i.qty}</span>
                      <button
                        onClick={() => updateQty(i.id, i.size, i.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </span>
                    <span className="line-price">
                      {inr(i.product.price * i.qty)}
                    </span>
                  </div>
                  <button
                    className="line-remove"
                    onClick={() => removeItem(i.id, i.size)}
                  >
                    Remove
                  </button>
                </div>
                <div />
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-foot">
            <div className="ship-bar">
              <p>
                {remaining > 0 ? (
                  <>
                    Add <strong>{inr(remaining)}</strong> more for complimentary
                    shipping
                  </>
                ) : (
                  <>
                    🎉 You&apos;ve unlocked{" "}
                    <strong>complimentary shipping</strong>
                  </>
                )}
              </p>
              <div className="ship-track">
                <div className="ship-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="cart-total">
              <span>Subtotal</span>
              <strong>{inr(subtotal)}</strong>
            </div>
            <p className="cart-note">
              Shipping &amp; taxes calculated at checkout
            </p>
            <Link
              href="/checkout"
              className="btn btn-gold btn-block"
              onClick={() => setIsOpen(false)}
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/cart"
              className="btn btn-outline btn-block"
              style={{ marginTop: 10 }}
              onClick={() => setIsOpen(false)}
            >
              View Full Bag
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
