/* ==========================================================================
   SOCIAL PROOF / RECENT SALES NOTIFICATIONS
   Vanilla JavaScript — no libraries needed.

   HOW TO INSTALL (3 steps):
     1. Add this line just before </body> on every page:
            <div id="social-proof"></div>
     2. Link the files (change the paths if you keep them elsewhere):
            <link rel="stylesheet" href="social-proof.css">
            <script src="social-proof.js"></script>
     3. Done — it starts by itself. Change the SETTINGS below to taste.

   HOW TO USE REAL DATA LATER:
     Replace the DUMMY_SALES array with data from your backend, e.g.:
            const res   = await fetch("/api/recent-sales");
            const sales = await res.json();   // [{ name, city, product, image }]
     then call:
            SocialProof.start(sales);
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     1. SETTINGS — change these freely
  ------------------------------------------------------------------ */
  const SETTINGS = {
    minDelayMs: 15000,  // shortest wait between popups (15 seconds)
    maxDelayMs: 30000,  // longest wait between popups (30 seconds)
    visibleMs:  4500,   // how long each popup stays on screen (4.5 seconds)
  };

  /* ------------------------------------------------------------------
     2. DUMMY DATA — swap this array with your backend data later.
     Each sale needs: buyer first name, city, product name, thumbnail URL.
  ------------------------------------------------------------------ */
  const IMG = (id) =>
    `https://images.unsplash.com/${id}?w=200&q=70&auto=format&fit=crop`;

  const DUMMY_SALES = [
    { name: "Aarav",   city: "Mumbai",    product: "Aurora Silk Dress",      image: IMG("photo-1595777457583-95e059d581b8") },
    { name: "Diya",    city: "New Delhi", product: "Noir Slip Dress",        image: IMG("photo-1515372039744-b8f02a3ae446") },
    { name: "Arjun",   city: "Bengaluru", product: "Essential Pima T-Shirt", image: IMG("photo-1521572163474-6864f9cf17ab") },
    { name: "Meera",   city: "Hyderabad", product: "Cloud Cashmere Sweater", image: IMG("photo-1434389677669-e08b4cac3105") },
    { name: "Kabir",   city: "Jaipur",    product: "Vintage Leather Jacket", image: IMG("photo-1551028719-00167b16eac5") },
    { name: "Ananya",  city: "Pune",      product: "Pleated Midi Skirt",     image: IMG("photo-1572804013309-59a88b7e92f1") },
    { name: "Rohan",   city: "Chennai",   product: "Selvedge Denim Jeans",   image: IMG("photo-1542272604-787c3835535d") },
    { name: "Ishaan",  city: "Kolkata",   product: "Merino Crew Sweater",    image: IMG("photo-1611312449408-fcece27cdbb7") },
    { name: "Sara",    city: "Mumbai",    product: "Ivory Linen Blazer",     image: IMG("photo-1581044777550-4cfa60707c03") },
    { name: "Vikram",  city: "New Delhi", product: "Field Utility Jacket",   image: IMG("photo-1591047139829-d91aecb6caea") },
  ];

  /* Realistic "time ago" labels shown under each popup */
  const TIME_LABELS = [
    "just now", "2 minutes", "5 minutes", "9 minutes",
    "14 minutes", "21 minutes", "28 minutes",
  ];

  /* Small gold checkmark icon (inline SVG — no image file needed) */
  const CHECK_SVG = `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="#c9a24b"/>
      <path d="M6.5 10.2l2.4 2.4 4.6-5" stroke="#1c1a17"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  /* ------------------------------------------------------------------
     3. HELPERS
  ------------------------------------------------------------------ */
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]; // random item
  const randMs = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;                // random number in range

  let mountEl = null;   // the <div id="social-proof"> container
  let toastEl = null;   // the popup element (built once, then reused)
  let loopTimer = null; // the repeating timer id
  let hideTimer = null; // the "slide out" timer id
  let running = false;

  /* Build the popup HTML once and reuse it (cheap + smooth) */
  function buildToast() {
    toastEl = document.createElement("aside");
    toastEl.className = "sp-toast";
    toastEl.setAttribute("role", "status");
    toastEl.setAttribute("aria-live", "polite");
    toastEl.innerHTML = `
      <img class="sp-thumb" src="" alt="">
      <div class="sp-text">
        <p class="sp-line1"><strong data-sp="name"></strong> from <span data-sp="city"></span></p>
        <p class="sp-line2">Purchased <span data-sp="product"></span></p>
        <p class="sp-line3"><span data-sp="time"></span> ago &nbsp;·&nbsp;
          <span class="sp-verified">${CHECK_SVG} Verified Buyer</span></p>
      </div>
      <button class="sp-close" type="button" aria-label="Dismiss notification">×</button>`;
    // The × button hides this popup but keeps the loop running.
    toastEl.querySelector(".sp-close").addEventListener("click", hideToast);
    mountEl.appendChild(toastEl);
  }

  /* Fill the popup with one random sale and slide it in */
  function showToast(sales) {
    const sale = pick(sales);
    toastEl.querySelector(".sp-thumb").src = sale.image;
    toastEl.querySelector(".sp-thumb").alt = sale.product;
    toastEl.querySelector('[data-sp="name"]').textContent = sale.name;
    toastEl.querySelector('[data-sp="city"]').textContent = sale.city;
    toastEl.querySelector('[data-sp="product"]').textContent = sale.product;
    toastEl.querySelector('[data-sp="time"]').textContent = pick(TIME_LABELS);

    toastEl.classList.add("sp-show");                    // slide in
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideToast, SETTINGS.visibleMs); // slide out after 4.5s
  }

  function hideToast() {
    if (toastEl) toastEl.classList.remove("sp-show");
  }

  /* Show one popup, then wait a random 15–30s and repeat forever */
  function loop(sales) {
    if (!running) return;
    showToast(sales);
    loopTimer = setTimeout(
      () => loop(sales),
      randMs(SETTINGS.minDelayMs, SETTINGS.maxDelayMs)
    );
  }

  /* Make sure the <div id="social-proof"> container exists */
  function getMount() {
    if (!mountEl) mountEl = document.getElementById("social-proof");
    if (!mountEl) console.warn('[SocialProof] Add <div id="social-proof"></div> before </body>.');
    return mountEl;
  }

  /* ------------------------------------------------------------------
     4. PUBLIC API — also handy for "preview" buttons in your own pages
  ------------------------------------------------------------------ */
  const SocialProof = {
    start(sales = DUMMY_SALES) {
      if (!getMount()) return;
      if (!toastEl) buildToast();
      this.stop();
      running = true;
      // First popup appears quickly so you can see it working, then the loop takes over.
      setTimeout(() => loop(sales), 2500);
    },
    stop() {
      running = false;
      clearTimeout(loopTimer);
      clearTimeout(hideTimer);
    },
    showOnce(sales = DUMMY_SALES) {  // show one popup right now
      if (!getMount()) return;
      if (!toastEl) buildToast();
      showToast(sales);
    },
  };

  window.SocialProof = SocialProof; // expose for buttons / other scripts

  // Auto-start when the page finishes loading.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => SocialProof.start());
  } else {
    SocialProof.start();
  }
})();
