import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const categoryTiles = [
  { name: "Electronics", icon: "🔌", blurb: "Gadgets & audio" },
  { name: "Fashion", icon: "👕", blurb: "Wear it well" },
  { name: "Home", icon: "🏠", blurb: "Comfort living" },
  { name: "Sports", icon: "🏋️", blurb: "Stay active" },
];

export default function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <>
      <section className="hero">
        <h1>Welcome to ShopNext</h1>
        <p>Discover quality products at unbeatable prices — now powered by Next.js.</p>
        <Link href="/products" className="btn">
          Shop Now
        </Link>
        <div className="hero-badges">
          <span className="hero-badge">🚚 Free shipping over $50</span>
          <span className="hero-badge">↩️ 30-day returns</span>
          <span className="hero-badge">🔒 Secure checkout</span>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Find exactly what you are looking for</p>
          <div className="category-grid">
            {categoryTiles.map((c) => (
              <Link
                key={c.name}
                href={`/products?category=${encodeURIComponent(c.name)}`}
                className="category-tile"
              >
                <div className="tile-icon">{c.icon}</div>
                <h3>{c.name}</h3>
                <p>{c.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Handpicked favourites from our catalog</p>
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/products" className="btn btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="perks-grid">
            <div className="perk">
              <div className="perk-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Free shipping on all orders over $50.</p>
            </div>
            <div className="perk">
              <div className="perk-icon">🔒</div>
              <h3>Secure Checkout</h3>
              <p>Your payment details are always protected.</p>
            </div>
            <div className="perk">
              <div className="perk-icon">↩️</div>
              <h3>Easy Returns</h3>
              <p>30-day hassle-free return policy.</p>
            </div>
            <div className="perk">
              <div className="perk-icon">💬</div>
              <h3>24/7 Support</h3>
              <p>We are here to help, anytime.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
