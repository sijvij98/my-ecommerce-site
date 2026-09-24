"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

export default function ProductCard({ product }) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
    openCart();
  };

  return (
    <div className="product-card">
      <Link href={`/products/${product.id}`} className="product-image-link">
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <Link href={`/products/${product.id}`} className="product-name">
          {product.name}
        </Link>
        <div className="product-rating">
          {"★".repeat(Math.round(product.rating))}{" "}
          <span>
            {product.rating} ({product.reviews})
          </span>
        </div>
        <div className="product-price-row">
          <span className="product-price">{formatPrice(product.price)}</span>
        </div>
        <button
          className={`btn btn-primary btn-block ${added ? "btn-added" : ""}`}
          onClick={handleAdd}
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
