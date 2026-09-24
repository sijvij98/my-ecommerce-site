"use client";

import Link from "next/link";
import { inr } from "../data/products";
import { useCart } from "../context/CartContext";

export function Stars({ rating }) {
  const full = Math.round(rating);
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(full)}
      {"☆".repeat(5 - full)}
    </span>
  );
}

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const off = product.mrp
    ? Math.round((1 - product.price / product.mrp) * 100)
    : 0;

  return (
    <article className="pcard">
      <Link
        href={`/products/${product.id}`}
        className="pcard-media"
        aria-label={product.name}
      >
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && (
          <span
            className={`pcard-badge ${
              product.badge === "Limited" ? "limited" : ""
            }`}
          >
            {product.badge}
          </span>
        )}
      </Link>
      <button
        className="pcard-quick"
        onClick={() => addItem(product.id, "M", 1)}
      >
        + Quick Add
      </button>
      <div className="pcard-body">
        <span className="pcard-cat">{product.category}</span>
        <Link href={`/products/${product.id}`} className="pcard-name">
          {product.name}
        </Link>
        <div className="pcard-meta">
          <Stars rating={product.rating} />
          <span>
            {product.rating} ({product.reviews})
          </span>
        </div>
        <div className="pcard-price">
          <span className="price">{inr(product.price)}</span>
          {product.mrp && <span className="mrp">{inr(product.mrp)}</span>}
          {off > 0 && <span className="off">{off}% off</span>}
        </div>
      </div>
    </article>
  );
}
