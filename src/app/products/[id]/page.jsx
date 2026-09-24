"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import { getProductById, getRelatedProducts, formatPrice } from "@/data/products";

export default function ProductDetailPage({ params }) {
  const product = getProductById(params.id);
  const { addItem, openCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container section" style={{ textAlign: "center" }}>
        <h1>Product not found</h1>
        <p style={{ margin: "1rem 0 2rem", color: "#777" }}>
          The product you are looking for does not exist.
        </p>
        <Link href="/products" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  const related = getRelatedProducts(product.id);
  const lowStock = product.stock <= 20;

  const handleAdd = () => {
    addItem(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    openCart();
  };

  return (
    <div className="container section">
      <Link href="/products" className="back-link">
        ← Back to products
      </Link>

      <div className="detail-layout">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="product-rating">
            {"★".repeat(Math.round(product.rating))}{" "}
            <span>
              {product.rating} · {product.reviews} reviews
            </span>
          </div>
          <div className="detail-price">{formatPrice(product.price)}</div>
          <p className="detail-desc">{product.description}</p>
          <p className={lowStock ? "stock-low" : "stock-ok"}>
            {lowStock
              ? `Only ${product.stock} left in stock — order soon!`
              : "In stock, ready to ship"}
          </p>

          <div className="qty-row">
            <span>Quantity:</span>
            <div className="qty-stepper">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                −
              </button>
              <span>{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="detail-actions">
            <button
              className={`btn btn-success ${added ? "btn-added" : ""}`}
              onClick={handleAdd}
            >
              {added ? "Added to Cart ✓" : `Add ${qty} to Cart`}
            </button>
            <Link href="/cart" className="btn btn-outline">
              View Cart
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: "4rem" }}>
          <h2 className="section-title">You may also like</h2>
          <div className="product-grid" style={{ marginTop: "2rem" }}>
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
