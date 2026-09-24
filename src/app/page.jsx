import Link from "next/link";
import ProductCard from "../components/ProductCard";
import Newsletter from "../components/Newsletter";
import {
  products,
  HERO_IMAGE,
  WOMEN_TILE,
  MEN_TILE,
  EDITORIAL_IMAGE,
  CATEGORY_TILES,
} from "../data/products";

const craftItems = [
  {
    title: "Premium Fabrics",
    text: "Mulberry silk, Mongolian cashmere, Japanese selvedge denim.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2l2.4 7.2H22l-6 4.6 2.3 7.2-6.3-4.5-6.3 4.5L8 13.8 2 9.2h7.6L12 2z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Honest Pricing",
    text: "Luxury-grade quality without the luxury markup.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2v20M17 6.5c0-2-2.2-3-5-3s-5 1-5 3 2 2.6 5 3.2 5 1.4 5 3.8-2.2 3-5 3-5-1-5-3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Free Shipping",
    text: "Complimentary shipping across India on orders over ₹4,999.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" strokeLinejoin="round" />
        <circle cx="7" cy="18.5" r="1.8" />
        <circle cx="17" cy="18.5" r="1.8" />
      </svg>
    ),
  },
  {
    title: "Easy Returns",
    text: "30-day no-questions returns with doorstep pickup.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    quote:
      "The silk dress fits like it was cut for me. I have never received so many compliments on a single piece.",
    name: "Ananya Sharma",
    meta: "Mumbai · Verified Buyer",
    initial: "A",
  },
  {
    quote:
      "Finally, a blazer off the rack that looks bespoke. The half-canvas construction is the real deal.",
    name: "Rohan Mehta",
    meta: "Delhi · Verified Buyer",
    initial: "R",
  },
  {
    quote:
      "Ordered on Monday, wearing it by Friday. Even the packaging felt like a gift to myself.",
    name: "Priya Nair",
    meta: "Bengaluru · Verified Buyer",
    initial: "P",
  },
];

export default function Home() {
  const bestsellers = [
    ...products.filter((p) => p.badge === "Bestseller"),
    ...products
      .filter((p) => p.badge !== "Bestseller")
      .sort((a, b) => b.rating - a.rating),
  ].slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <img src={HERO_IMAGE} alt="Urbaniq Autumn Winter 2026 collection" />
        </div>
        <div className="hero-veil" />
        <div className="container">
          <div className="hero-content">
            <span className="eyebrow fade-up">✦ Just launched — AW &lsquo;26</span>
            <h1 className="fade-up fade-up-1">
              The new drop <em>is here</em>
            </h1>
            <p className="fade-up fade-up-2">
              Sixteen icons, one standard: uncompromising. Be first to wear
              the Autumn/Winter &lsquo;26 collection — silk, cashmere, selvedge
              and tailoring, live now.
            </p>
            <div className="hero-ctas fade-up fade-up-3">
              <Link href="/products?badge=New" className="btn btn-gold">
                Shop the New Drop
              </Link>
              <Link href="/products" className="btn btn-outline">
                Explore All
              </Link>
            </div>
            <div className="hero-meta fade-up fade-up-3">
              <div>
                <strong>16</strong>
                <span>New styles</span>
              </div>
              <div>
                <strong>4.8★</strong>
                <span>Avg. rating</span>
              </div>
              <div>
                <strong>10%</strong>
                <span>Off · code URBAN10</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY CIRCLES */}
      <section className="section-tight" style={{ paddingTop: 70 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Shop by Category
          </span>
          <div className="cat-circles">
            {CATEGORY_TILES.map((c) => (
              <Link
                key={c.name}
                href={`/products?category=${encodeURIComponent(c.name)}`}
                className="circle-cat"
                aria-label={`Shop ${c.name}`}
              >
                <span className="ring">
                  <img src={c.image} alt={c.name} loading="lazy" />
                </span>
                <span>{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Shop By</span>
              <h2 className="section-title">
                Two wardrobes, <em>one standard</em>
              </h2>
            </div>
            <Link href="/products" className="link-arrow">
              View all →
            </Link>
          </div>
          <div className="cat-grid">
            <Link
              href="/products?gender=women"
              className="cat-tile"
              aria-label="Shop women's clothing"
            >
              <img src={WOMEN_TILE} alt="Women's collection" loading="lazy" />
              <div className="cat-info">
                <div>
                  <h3>Women</h3>
                  <p>8 styles · Dresses to denim</p>
                </div>
                <span className="cat-circle">→</span>
              </div>
            </Link>
            <Link
              href="/products?gender=men"
              className="cat-tile"
              aria-label="Shop men's clothing"
            >
              <img src={MEN_TILE} alt="Men's collection" loading="lazy" />
              <div className="cat-info">
                <div>
                  <h3>Men</h3>
                  <p>8 styles · Tailoring to tees</p>
                </div>
                <span className="cat-circle">→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="section-tight">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Most Loved</span>
              <h2 className="section-title">
                The <em>bestsellers</em>
              </h2>
              <p className="section-sub">
                The pieces our customers reach for again and again — rated
                4.6★ and above.
              </p>
            </div>
            <Link href="/products" className="link-arrow">
              Shop all →
            </Link>
          </div>
          <div className="product-grid">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CRAFT STRIP */}
      <section className="section-tight craft" style={{ marginTop: 70 }}>
        <div className="container">
          <div className="craft-grid">
            {craftItems.map((c) => (
              <div className="craft-item" key={c.title}>
                <span className="craft-ico">{c.icon}</span>
                <div>
                  <h4>{c.title}</h4>
                  <p>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="section">
        <div className="container">
          <div className="editorial">
            <img src={EDITORIAL_IMAGE} alt="Inside the Urbaniq atelier" loading="lazy" />
            <div className="editorial-content">
              <span className="eyebrow">The Urbaniq Philosophy</span>
              <blockquote>
                “Elegance is refusal — of the ordinary, the ill-fitting and
                the forgettable.”
              </blockquote>
              <cite>The Urbaniq Atelier</cite>
              <div style={{ marginTop: 30 }}>
                <Link href="/products" className="btn btn-gold">
                  Explore the Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-tight">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Word of Mouth</span>
              <h2 className="section-title">
                Worn &amp; <em>loved</em>
              </h2>
            </div>
          </div>
          <div className="testi-grid">
            {testimonials.map((t) => (
              <div className="testi" key={t.name}>
                <span className="stars">★★★★★</span>
                <p>“{t.quote}”</p>
                <div className="testi-who">
                  <span className="testi-ava">{t.initial}</span>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.meta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="section-tight">
        <div className="container">
          <Newsletter />
        </div>
      </section>
    </>
  );
}
