# URBANIQ — Premium Clothing E-Commerce (Next.js)

**Wear Your Story.** A fully functional, dark-luxury e-commerce website for a women's & men's clothing brand, built with **Next.js 14 (App Router)** and React 18.

## Brand & Theme

- **Brand:** URBANIQ — modern luxury clothing for Women & Men
- **Theme:** Deep charcoal + champagne gold (matches the Urbaniq logo in `public/logo.png`)
- **Typography:** Playfair Display (serif headings) + Jost (body), via Google Fonts
- **Currency:** Indian Rupee (₹)

## Features

- **Home:** cinematic hero, Women/Men category tiles, bestsellers, craft strip, editorial banner, testimonials, newsletter signup
- **Shop:** gender tabs (All / Women / Men), category pills, live search, 4 sort orders, badge collections (Bestsellers / New Arrivals)
- **Product pages:** colour dots, size selector (XS–XL), quantity, accordions (fit / fabric / shipping), ratings, related products
- **Cart:** slide-in drawer + full bag page, free-shipping progress bar (₹4,999 threshold), quantity controls, localStorage persistence
- **Checkout:** contact + address + payment (Card / UPI / COD) with full validation, order summary
- **Order success:** confirmation seal + generated order number
- 16 clothing products with real photography (Unsplash), fabric & fit notes

## Run Locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

## Deploy

Push to GitHub, then import the repo in [Vercel](https://vercel.com) — it auto-detects Next.js. Every push to `main` redeploys automatically.

## Customise

- Products: `src/data/products.js`
- Colours/fonts: CSS variables at the top of `src/app/globals.css`
- Logo: replace `public/logo.png`
- Free-shipping threshold: `FREE_SHIPPING_THRESHOLD` in `src/data/products.js`
