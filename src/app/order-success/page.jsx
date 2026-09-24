"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const params = useSearchParams();
  const order = params.get("order") || "UQ-000000";

  return (
    <div className="container">
      <div className="success-wrap">
        <div className="success-seal">✓</div>
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          Order Confirmed
        </span>
        <h1>
          Thank you, <em>beautifully</em> done.
        </h1>
        <p>
          Your order is being prepared with care. A confirmation has been sent
          to your email and mobile.
        </p>
        <div className="order-num">{order}</div>
        <p style={{ marginBottom: 34, fontSize: "0.9rem" }}>
          Expected delivery: 3–5 working days · Free 30-day returns
        </p>
        <div className="success-actions">
          <Link href="/products" className="btn btn-gold">
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

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container" style={{ padding: "120px 0", textAlign: "center" }}>
          Confirming your order…
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
