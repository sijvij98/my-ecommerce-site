export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="logo">
            Shop<span>Next</span>
          </div>
          <p>Quality products at unbeatable prices, delivered to your door.</p>
        </div>
        <div className="footer-links">
          <h4>Shop</h4>
          <a href="/products">All Products</a>
          <a href="/products?category=Electronics">Electronics</a>
          <a href="/products?category=Fashion">Fashion</a>
          <a href="/cart">Your Cart</a>
        </div>
        <div className="footer-links">
          <h4>Support</h4>
          <a href="/checkout">Checkout</a>
          <a href="#contact">Contact Us</a>
          <a href="#contact">Shipping Info</a>
          <a href="#contact">Returns</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 ShopNext. All rights reserved. Demo store with dummy products.</p>
      </div>
    </footer>
  );
}
