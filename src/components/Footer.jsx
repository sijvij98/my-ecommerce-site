import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand">
              <img src="/logo.png" alt="Urbaniq logo" className="brand-mark" />
              <span>
                <span className="brand-name">
                  URBAN<span>IQ</span>
                </span>
                <span className="brand-tag" style={{ display: "block" }}>
                  Wear your story
                </span>
              </span>
            </Link>
            <p>
              Premium wardrobe essentials for women and men — cut from the
              world&apos;s finest fabrics, designed in India, made to be lived
              in.
            </p>
            <div className="socials">
              <a href="#" aria-label="Instagram" title="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" title="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5v4h3v7h4v-7h3l1-4h-4V7.8c0-.9.6-1.3 1.4-1.3H15V3z" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#" aria-label="X" title="X">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4l16 16M20 4L4 20" strokeLinecap="round" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube" title="YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
                  <path d="M10.5 9.5l5 2.5-5 2.5v-5z" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h5>Shop</h5>
            <ul>
              <li><Link href="/products?gender=women">Women</Link></li>
              <li><Link href="/products?gender=men">Men</Link></li>
              <li><Link href="/products">All Clothing</Link></li>
              <li><Link href="/products?badge=Bestseller">Bestsellers</Link></li>
              <li><Link href="/products?badge=New">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h5>Care</h5>
            <ul>
              <li><Link href="/cart">Shopping Bag</Link></li>
              <li><Link href="/checkout">Checkout</Link></li>
              <li><a href="#">Shipping &amp; Returns</a></li>
              <li><a href="#">Size Guide</a></li>
              <li><a href="#">Fabric Care</a></li>
            </ul>
          </div>

          <div>
            <h5>Company</h5>
            <ul>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Stores</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy &amp; Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Urbaniq. All rights reserved.</span>
          <span>Crafted with care in India</span>
        </div>
      </div>
    </footer>
  );
}
