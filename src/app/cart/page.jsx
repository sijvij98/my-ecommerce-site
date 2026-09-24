"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { inr, FREE_SHIPPING_THRESHOLD } from "../../data/products";

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal, count } = useCart();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 199;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="empty-state" style={{ padding: "110px 20px" }}>
          <span style={{ fontSize: "3.4rem", display: "block", marginBottom: 16 }}>
            👜
          </span>
          <h3>Your bag is empty</h3>
          <p>Beautiful things await. Start with our bestsellers.</p>
          <Link href="/products" className="btn btn-gold" style={{ marginTop: 24 }}>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <span className="eyebrow">Urbaniq</span>
      <h1 className="section-title">
        Your <em>Bag</em> <span style={{ fontSize: "1.4rem" }}>({count})</span>
      </h1>

      <div className="cart-page-grid" style={{ marginTop: 30 }}>
        <div>
          <div className="ship-bar" style={{ marginBottom: 26 }}>
            <p>
              {remaining > 0 ? (
                <>
                  Add <strong>{inr(remaining)}</strong> more for complimentary
                  shipping
                </>
              ) : (
                <>
                  🎉 You&apos;ve unlocked <strong>complimentary shipping</strong>
                </>
              )}
            </p>
            <div className="ship-track">
              <div className="ship-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {items.map((i) => (
            <div
              className="cart-line"
              key={`${i.id}__${i.size}`}
              style={{ gridTemplateColumns: "110px 1fr auto" }}
            >
              <Link href={`/products/${i.id}`}>
                <img
                  src={i.product.image}
                  alt={i.product.name}
                  style={{ width: 110, height: 136 }}
                />
              </Link>
              <div>
                <span className="pcard-cat">{i.product.category}</span>
                <h4 style={{ fontSize: "1.15rem" }}>{i.product.name}</h4>
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
                  <button
                    className="line-remove"
                    onClick={() => removeItem(i.id, i.size)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="line-price" style={{ fontSize: "1.1rem" }}>
                {inr(i.product.price * i.qty)}
              </div>
            </div>
          ))}

          <Link href="/products" className="link-arrow" style={{ marginTop: 22 }}>
            ← Continue shopping
          </Link>
        </div>

        <div className="summary-card">
          <h3>Order Summary</h3>
          <div className="sum-row">
            <span>Subtotal</span>
            <span>{inr(subtotal)}</span>
          </div>
          <div className="sum-row">
            <span>Shipping</span>
            <span className={shipping === 0 ? "free-ship" : ""}>
              {shipping === 0 ? "Complimentary" : inr(shipping)}
            </span>
          </div>
          <div className="sum-row grand">
            <span>Total</span>
            <strong>{inr(subtotal + shipping)}</strong>
          </div>
          <Link href="/checkout" className="btn btn-gold btn-block" style={{ marginTop: 18 }}>
            Proceed to Checkout
          </Link>
          <p className="cart-note">Secure checkout · 30-day returns</p>
        </div>
      </div>
    </div>
  );
}
