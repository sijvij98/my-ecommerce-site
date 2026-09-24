"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, relatedProducts, inr, SIZES } from "../../../data/products";
import { useCart } from "../../../context/CartContext";
import ProductCard, { Stars } from "../../../components/ProductCard";

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="acc-item">
      <button className="acc-head" onClick={() => setOpen((v) => !v)}>
        <span>{title}</span>
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && <div className="acc-body">{children}</div>}
    </div>
  );
}

export default function ProductDetail({ params }) {
  const product = getProduct(params.id);
  const { addItem } = useCart();
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(0);

  if (!product) notFound();

  const off = product.mrp
    ? Math.round((1 - product.price / product.mrp) * 100)
    : 0;
  const related = relatedProducts(product.id, 4);

  return (
    <div className="container">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href={`/products?gender=${product.gender}`}>
          {product.gender === "women" ? "Women" : "Men"}
        </Link>
        <span>/</span>
        {product.name}
      </nav>

      <div className="pd-wrap">
        <div className="pd-media">
          {product.badge && (
            <span
              className="pcard-badge"
              style={{ top: 18, left: 18 }}
            >
              {product.badge}
            </span>
          )}
          <img src={product.image} alt={product.name} />
        </div>

        <div className="pd-info">
          <span className="eyebrow">
            {product.gender === "women" ? "Women" : "Men"} · {product.category}
          </span>
          <h1>{product.name}</h1>
          <div className="pd-rating">
            <Stars rating={product.rating} />
            <span>
              {product.rating} · {product.reviews} verified reviews
            </span>
          </div>
          <div className="pd-price">
            <span className="price">{inr(product.price)}</span>
            {product.mrp && <span className="mrp">{inr(product.mrp)}</span>}
            {off > 0 && <span className="off">{off}% off</span>}
          </div>
          <p className="pd-tax">Inclusive of all taxes</p>
          <p className="pd-desc">{product.description}</p>

          <div className="opt-label">
            <span>Colour</span>
          </div>
          <div className="color-row">
            {product.colors.map((c, i) => (
              <button
                key={c}
                className={`color-dot ${i === color ? "active" : ""}`}
                style={{ background: c }}
                onClick={() => setColor(i)}
                aria-label={`Colour option ${i + 1}`}
              />
            ))}
          </div>

          <div className="opt-label">
            <span>Select size</span>
            <button type="button">Size guide</button>
          </div>
          <div className="size-row" role="radiogroup" aria-label="Size">
            {SIZES.map((s) => (
              <button
                key={s}
                className={`size-btn ${size === s ? "active" : ""}`}
                onClick={() => setSize(s)}
                role="radio"
                aria-checked={size === s}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="pd-actions">
            <span className="qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                −
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(9, q + 1))} aria-label="Increase quantity">
                +
              </button>
            </span>
            <button
              className="btn btn-gold"
              onClick={() => addItem(product.id, size, qty)}
            >
              Add to Bag — {inr(product.price * qty)}
            </button>
          </div>

          <div className="accordion">
            <Accordion title="Details & Fit" defaultOpen>
              {product.fit}
            </Accordion>
            <Accordion title="Fabric & Care">
              {product.fabric}. Machine wash cold, dry flat in shade. Cool
              iron if needed.
            </Accordion>
            <Accordion title="Shipping & Returns">
              Dispatched in 24 hours. Complimentary shipping on orders over
              ₹4,999. 30-day easy returns with free doorstep pickup.
            </Accordion>
          </div>

          <div className="pd-trust">
            <div>
              <strong>✦</strong>Premium fabric
            </div>
            <div>
              <strong>✓</strong>Quality checked
            </div>
            <div>
              <strong>↩</strong>30-day returns
            </div>
          </div>
        </div>
      </div>

      <div className="section-tight">
        <div className="section-head">
          <div>
            <span className="eyebrow">Complete the look</span>
            <h2 className="section-title">
              You may also <em>love</em>
            </h2>
          </div>
          <Link
            href={`/products?gender=${product.gender}`}
            className="link-arrow"
          >
            View all →
          </Link>
        </div>
        <div className="product-grid" style={{ paddingBottom: 40 }}>
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
