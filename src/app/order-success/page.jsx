"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice } from "@/data/products";

export default function OrderSuccessPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("last-order");
      if (raw) {
        setOrder(JSON.parse(raw));
        window.sessionStorage.removeItem("last-order");
      }
    } catch {}
  }, []);

  return (
    <div className="container section">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h1>Thank You for Your Order!</h1>
        <p style={{ color: "#777" }}>
          Your order has been placed successfully. A confirmation email
          {order ? (
            <>
              {" "}has been sent to <strong>{order.email}</strong>
            </>
          ) : (
            " has been sent to you"
          )}
          .
        </p>
        {order && (
          <>
            <div className="order-number">Order {order.number}</div>
            <p style={{ color: "#555" }}>
              {order.itemCount} {order.itemCount === 1 ? "item" : "items"} · Total{" "}
              <strong>{formatPrice(order.total)}</strong>
            </p>
          </>
        )}
        <div className="success-actions">
          <Link href="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
          <Link href="/" className="btn btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
