"use client";

import { useEffect, useRef, useState } from "react";
import { products } from "../data/products";

/* ------------------------------------------------------------------
   Dummy buyer names/cities.
   Later: replace with real order data from your backend
   (e.g. fetch("/api/recent-sales") and build the sale object there).
------------------------------------------------------------------ */
const BUYERS = [
  { name: "Aarav", city: "Mumbai" },
  { name: "Diya", city: "New Delhi" },
  { name: "Arjun", city: "Bengaluru" },
  { name: "Meera", city: "Hyderabad" },
  { name: "Kabir", city: "Jaipur" },
  { name: "Ananya", city: "Pune" },
  { name: "Rohan", city: "Chennai" },
  { name: "Ishaan", city: "Kolkata" },
  { name: "Sara", city: "Mumbai" },
  { name: "Vikram", city: "New Delhi" },
];

const TIME_LABELS = [
  "just now",
  "2 minutes",
  "5 minutes",
  "9 minutes",
  "14 minutes",
  "21 minutes",
  "28 minutes",
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randMs = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function SocialProofToast() {
  const [sale, setSale] = useState(null);
  const [show, setShow] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    // Show one popup: pick a random product + buyer, slide in for 4.5s,
    // then wait a random 15–30s before the next one.
    const showOne = () => {
      const product = pick(products);
      setSale({
        buyer: pick(BUYERS),
        product: product.name,
        image: product.image,
        time: pick(TIME_LABELS),
      });
      setShow(true);
      timers.current.push(setTimeout(() => setShow(false), 4500));
      timers.current.push(setTimeout(showOne, 4500 + randMs(15000, 30000)));
    };

    // First popup appears quickly so visitors see it working.
    timers.current.push(setTimeout(showOne, 2500));
    return () => timers.current.forEach(clearTimeout);
  }, []);

  if (!sale) return null;

  return (
    <aside
      className={`sp-toast${show ? " sp-show" : ""}`}
      role="status"
      aria-live="polite"
    >
      <img className="sp-thumb" src={sale.image} alt={sale.product} />
      <div className="sp-text">
        <p className="sp-line1">
          <strong>{sale.buyer.name}</strong> from {sale.buyer.city}
        </p>
        <p className="sp-line2">Purchased {sale.product}</p>
        <p className="sp-line3">
          {sale.time} ago &nbsp;·&nbsp;
          <span className="sp-verified">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="9" fill="#c9a24b" />
              <path
                d="M6.5 10.2l2.4 2.4 4.6-5"
                stroke="#1c1a17"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Verified Buyer
          </span>
        </p>
      </div>
      <button
        className="sp-close"
        type="button"
        aria-label="Dismiss notification"
        onClick={() => setShow(false)}
      >
        ×
      </button>
    </aside>
  );
}
