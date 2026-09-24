"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { products, CATEGORIES } from "../data/products";

const SORTS = [
  { id: "featured", label: "Sort: Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Top Rated" },
];

export default function ProductListing() {
  const params = useSearchParams();
  const presetGender = params.get("gender") || "all";
  const presetBadge = params.get("badge") || null;

  const [gender, setGender] = useState(
    ["women", "men"].includes(presetGender) ? presetGender : "all"
  );
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let list = [...products];
    if (presetBadge) list = list.filter((p) => p.badge === presetBadge);
    if (gender !== "all") list = list.filter((p) => p.gender === gender);
    if (category !== "All") list = list.filter((p) => p.category === category);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [gender, category, query, sort, presetBadge]);

  const title =
    presetBadge === "Bestseller"
      ? "The <em>Bestsellers</em>"
      : presetBadge === "New"
      ? "New <em>Arrivals</em>"
      : gender === "women"
      ? "Women's <em>Collection</em>"
      : gender === "men"
      ? "Men's <em>Collection</em>"
      : "The <em>Collection</em>";

  return (
    <>
      <div className="shop-hero">
        <div className="container">
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Urbaniq
          </span>
          <h1 dangerouslySetInnerHTML={{ __html: title }} />
          <p>
            Sixteen considered pieces — silk, cashmere, selvedge denim and
            tailoring — built to outlast trends.
          </p>
          <div className="gender-tabs" role="tablist" aria-label="Shop by gender">
            {[
              { id: "all", label: "All" },
              { id: "women", label: "Women" },
              { id: "men", label: "Men" },
            ].map((g) => (
              <button
                key={g.id}
                className={gender === g.id ? "active" : ""}
                onClick={() => setGender(g.id)}
                role="tab"
                aria-selected={gender === g.id}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="toolbar">
          <div className="cat-pills">
            {["All", ...CATEGORIES].map((c) => (
              <button
                key={c}
                className={`pill ${category === c ? "active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="toolbar-right">
            <div className="search-box">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                placeholder="Search silk, denim, blazer…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search products"
              />
            </div>
            <select
              className="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="result-count" style={{ marginBottom: 22 }}>
          {filtered.length} {filtered.length === 1 ? "style" : "styles"}
        </p>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <h3>Nothing found</h3>
            <p>Try a different search or clear your filters.</p>
            <button
              className="btn btn-outline"
              style={{ marginTop: 20 }}
              onClick={() => {
                setQuery("");
                setCategory("All");
                setGender("all");
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="product-grid" style={{ paddingBottom: 90 }}>
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
