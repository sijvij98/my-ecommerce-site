# ShopNext — E-Commerce Website (Next.js)

A fully functional e-commerce demo store built with **Next.js 14 (App Router)** and React 18.
Recreated from a plain HTML/CSS/JS storefront and upgraded with real routing, a persistent cart,
product search/filtering, and a working checkout flow — all with dummy products.

## Features

- **Home page** — hero, shop-by-category tiles, featured products, trust perks
- **Product listing** (`/products`) — live search, category filter pills, sorting (featured / price / rating)
- **Product detail** (`/products/[id]`) — image, rating, stock status, quantity stepper, related products
- **Cart sidebar** — slide-in mini cart on every page (add, quantity +/−, remove, subtotal)
- **Cart page** (`/cart`) — full cart with order summary, free-shipping progress (free over $50)
- **Checkout** (`/checkout`) — contact + shipping + payment form with validation and a demo payment step
- **Order success** (`/order-success`) — confirmation with generated order number
- **Persistent cart** — saved in `localStorage`, survives page reloads
- **12 dummy products** across Electronics, Fashion, Home and Sports (`src/data/products.js`)
- Fully responsive layout, no UI framework required

## Getting started

Requires **Node.js 18+**.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

## Project structure

```
src/
  app/
    layout.jsx            # Root layout (header, cart sidebar, footer)
    page.jsx              # Home page
    globals.css           # All styles
    products/page.jsx     # Product listing
    products/[id]/page.jsx# Product detail
    cart/page.jsx         # Cart page
    checkout/page.jsx     # Checkout form
    order-success/page.jsx# Order confirmation
  components/
    Header.jsx            # Sticky header + cart button
    Footer.jsx
    CartSidebar.jsx       # Slide-in mini cart
    ProductCard.jsx       # Product card
    ProductListing.jsx    # Search / filter / sort logic
  context/
    CartContext.jsx       # Global cart state (React Context + localStorage)
  data/
    products.js           # Dummy product catalog — edit this to add your products
```

## Customising

- **Products:** edit `src/data/products.js` (name, price, category, image, description, stock).
- **Images:** product images currently use `picsum.photos` placeholder URLs — swap in your own URLs or put files in `public/` and reference them as `/your-image.jpg`.
- **Shipping rules:** `FREE_SHIPPING_THRESHOLD` and `SHIPPING_FLAT_RATE` live in `src/data/products.js`.
- **Payments:** checkout is a demo (no real charge). Plug in Stripe/Razorpay/etc. in `src/app/checkout/page.jsx`.

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Next.js e-commerce store"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

## Deploy

Easiest: import the repo at [vercel.com](https://vercel.com) — it auto-detects Next.js. No config needed.
