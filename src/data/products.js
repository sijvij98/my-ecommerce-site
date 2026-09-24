export const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");

const img = (id) =>
  `https://images.unsplash.com/${id}?w=900&q=80&auto=format&fit=crop`;

export const SIZES = ["XS", "S", "M", "L", "XL"];

export const CATEGORIES = [
  "Dresses",
  "Shirts",
  "T-Shirts",
  "Bottoms",
  "Knitwear",
  "Outerwear",
];

export const FREE_SHIPPING_THRESHOLD = 4999;

export const products = [
  {
    id: 1,
    name: "Aurora Silk Dress",
    gender: "women",
    category: "Dresses",
    price: 4999,
    mrp: 6499,
    rating: 4.8,
    reviews: 214,
    badge: "Bestseller",
    image: img("photo-1595777457583-95e059d581b8"),
    colors: ["#3b2f2f", "#c9a24b", "#1c1a17"],
    description:
      "A fluid bias-cut dress in lustrous mulberry silk that catches the light with every step. Adjustable straps and a midi hem make it effortless from dinner to evening soirées.",
    fabric: "100% mulberry silk, silk lining",
    fit: "Bias cut, true to size. Model wears size S.",
  },
  {
    id: 2,
    name: "Ivory Linen Blazer",
    gender: "women",
    category: "Outerwear",
    price: 6499,
    mrp: 7999,
    rating: 4.9,
    reviews: 96,
    badge: "New",
    image: img("photo-1581044777550-4cfa60707c03"),
    colors: ["#efe6d4", "#b9a98c", "#1c1a17"],
    description:
      "Sharply tailored yet breathable, this single-breasted blazer is cut from European flax linen with natural horn buttons. The boardroom-to-brunch essential.",
    fabric: "100% European flax linen",
    fit: "Tailored fit, true to size.",
  },
  {
    id: 3,
    name: "Noir Slip Dress",
    gender: "women",
    category: "Dresses",
    price: 3999,
    mrp: 4999,
    rating: 4.7,
    reviews: 188,
    badge: null,
    image: img("photo-1515372039744-b8f02a3ae446"),
    colors: ["#1c1a17", "#5c1f24"],
    description:
      "The iconic nineties silhouette, reimagined. A minimalist cowl-neck slip in washed satin that layers beautifully or stands alone.",
    fabric: "Washed satin, 96% polyester, 4% elastane",
    fit: "Relaxed slip fit, true to size.",
  },
  {
    id: 4,
    name: "Cloud Cashmere Sweater",
    gender: "women",
    category: "Knitwear",
    price: 5499,
    mrp: 6999,
    rating: 4.8,
    reviews: 142,
    badge: null,
    image: img("photo-1434389677669-e08b4cac3105"),
    colors: ["#d9cfc0", "#8a7a63", "#3b2f2f"],
    description:
      "Spun from Grade-A Mongolian cashmere, this feather-light crew feels like wearing a cloud. Ribbed trims keep the silhouette crisp season after season.",
    fabric: "100% Grade-A Mongolian cashmere",
    fit: "Relaxed fit. Take your usual size.",
  },
  {
    id: 5,
    name: "High-Rise Straight Jeans",
    gender: "women",
    category: "Bottoms",
    price: 2999,
    mrp: 3799,
    rating: 4.6,
    reviews: 327,
    badge: "Bestseller",
    image: img("photo-1541099649105-f69ad21f3246"),
    colors: ["#2e4057", "#101418", "#7a8ba0"],
    description:
      "Our best-selling denim: a leg-lengthening high rise with a timeless straight leg, cut from rigid Japanese denim that moulds to you.",
    fabric: "100% Japanese cotton denim, 13 oz",
    fit: "High rise, straight leg. True to size.",
  },
  {
    id: 6,
    name: "Pleated Midi Skirt",
    gender: "women",
    category: "Bottoms",
    price: 2799,
    mrp: 3499,
    rating: 4.7,
    reviews: 74,
    badge: "New",
    image: img("photo-1572804013309-59a88b7e92f1"),
    colors: ["#c9a24b", "#1c1a17", "#efe6d4"],
    description:
      "Knife pleats that move like liquid. This midi skirt pairs with everything from crisp shirts to chunky knits.",
    fabric: "Polyester crepe with satin finish",
    fit: "Elasticated back waist, true to size.",
  },
  {
    id: 7,
    name: "Essential White Shirt",
    gender: "women",
    category: "Shirts",
    price: 1999,
    mrp: 2599,
    rating: 4.8,
    reviews: 256,
    badge: null,
    image: img("photo-1596755094514-f87e34085b2c"),
    colors: ["#f5f2ea", "#dfe6ea"],
    description:
      "The perfect white shirt does exist. Cut from breathable Supima cotton poplin with mother-of-pearl buttons.",
    fabric: "100% Supima cotton poplin",
    fit: "Classic fit, true to size.",
  },
  {
    id: 8,
    name: "Camden Wool Overcoat",
    gender: "women",
    category: "Outerwear",
    price: 8999,
    mrp: 11999,
    rating: 4.9,
    reviews: 63,
    badge: "Limited",
    image: img("photo-1539533018447-63fcce2678e3"),
    colors: ["#6b5d4f", "#1c1a17", "#3b2f2f"],
    description:
      "A sweeping double-breasted overcoat in Italian wool twill. Hand-finished seams and a storm flap for winters that mean business.",
    fabric: "80% Italian wool, 20% cashmere",
    fit: "Oversized silhouette. Size down for a closer fit.",
  },
  {
    id: 9,
    name: "Tailored Navy Blazer",
    gender: "men",
    category: "Outerwear",
    price: 7999,
    mrp: 9999,
    rating: 4.8,
    reviews: 178,
    badge: "Bestseller",
    image: img("photo-1594938298603-c8148c4dae35"),
    colors: ["#1f2a44", "#3b3b3b", "#101418"],
    description:
      "Half-canvassed and hand-set, our signature blazer gives you a razor-sharp shoulder line with natural ease through the body.",
    fabric: "Italian wool-blend twill, half-canvas construction",
    fit: "Tailored fit, true to size.",
  },
  {
    id: 10,
    name: "Oxford White Shirt",
    gender: "men",
    category: "Shirts",
    price: 2499,
    mrp: 3199,
    rating: 4.7,
    reviews: 203,
    badge: null,
    image: img("photo-1602810318383-e386cc2a3ccf"),
    colors: ["#f5f2ea", "#cfe0ea", "#e8d9c0"],
    description:
      "A heavier-weight Oxford weave that holds its shape all day. Button-down collar, single-needle stitching throughout.",
    fabric: "100% long-staple cotton Oxford",
    fit: "Classic fit, true to size.",
  },
  {
    id: 11,
    name: "Selvedge Denim Jeans",
    gender: "men",
    category: "Bottoms",
    price: 3499,
    mrp: 4499,
    rating: 4.6,
    reviews: 291,
    badge: null,
    image: img("photo-1542272604-787c3835535d"),
    colors: ["#26343f", "#101418"],
    description:
      "Woven on vintage shuttle looms, these 14 oz selvedge jeans fade beautifully and uniquely to the wearer. Built for decades, not seasons.",
    fabric: "100% cotton selvedge denim, 14 oz",
    fit: "Straight leg, true to size. Expect minimal stretch.",
  },
  {
    id: 12,
    name: "Merino Crew Sweater",
    gender: "men",
    category: "Knitwear",
    price: 4299,
    mrp: 5499,
    rating: 4.8,
    reviews: 117,
    badge: "New",
    image: img("photo-1611312449408-fcece27cdbb7"),
    colors: ["#4a4a48", "#1f2a44", "#8a7a63"],
    description:
      "Extra-fine 19.5-micron merino, knitted densely for warmth without bulk. Naturally odour-resistant and machine washable.",
    fabric: "100% extra-fine merino wool",
    fit: "Regular fit, true to size.",
  },
  {
    id: 13,
    name: "Vintage Leather Jacket",
    gender: "men",
    category: "Outerwear",
    price: 9999,
    mrp: 12999,
    rating: 4.9,
    reviews: 89,
    badge: "Limited",
    image: img("photo-1551028719-00167b16eac5"),
    colors: ["#2b2118", "#101418"],
    description:
      "Full-grain aniline leather, burnished by hand for a rich vintage patina. Quilted shoulders and antique brass hardware.",
    fabric: "Full-grain aniline cowhide leather",
    fit: "Fitted biker cut. Size up for layering.",
  },
  {
    id: 14,
    name: "Essential Pima T-Shirt",
    gender: "men",
    category: "T-Shirts",
    price: 1299,
    mrp: 1699,
    rating: 4.7,
    reviews: 412,
    badge: "Bestseller",
    image: img("photo-1521572163474-6864f9cf17ab"),
    colors: ["#f5f2ea", "#101418", "#4a4a48", "#1f2a44"],
    description:
      "The last plain tee you will need to hunt for. Dense Peruvian Pima cotton with a collar that refuses to sag.",
    fabric: "100% Peruvian Pima cotton, 220 GSM",
    fit: "Classic fit, true to size.",
  },
  {
    id: 15,
    name: "Pleated Wool Trousers",
    gender: "men",
    category: "Bottoms",
    price: 3999,
    mrp: 4999,
    rating: 4.6,
    reviews: 98,
    badge: null,
    image: img("photo-1473966968600-fa801b869a1a"),
    colors: ["#3b3b3b", "#1f2a44", "#6b5d4f"],
    description:
      "Double-pleated front, tapered leg, cropped just above the shoe. Cut from crease-resistant tropical wool.",
    fabric: "100% tropical wool",
    fit: "Tailored tapered fit, true to size.",
  },
  {
    id: 16,
    name: "Field Utility Jacket",
    gender: "men",
    category: "Outerwear",
    price: 5999,
    mrp: 7499,
    rating: 4.7,
    reviews: 134,
    badge: "New",
    image: img("photo-1591047139829-d91aecb6caea"),
    colors: ["#5a5b3f", "#3b2f2f", "#101418"],
    description:
      "Four bellows pockets, a storm placket and water-repellent canvas — the field jacket, elevated to Urbaniq standards.",
    fabric: "Water-repellent cotton canvas",
    fit: "Regular fit with room to layer.",
  },
];

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=2400&q=80&auto=format&fit=crop";
export const WOMEN_TILE = img("photo-1529139574466-a303027c1d8b");
export const MEN_TILE = img("photo-1507679799987-c73779587ccf");
export const EDITORIAL_IMAGE = img("photo-1445205170230-053b83016050");

export const CATEGORY_TILES = [
  { name: "Dresses", image: img("photo-1595777457583-95e059d581b8") },
  { name: "Shirts", image: img("photo-1596755094514-f87e34085b2c") },
  { name: "T-Shirts", image: img("photo-1521572163474-6864f9cf17ab") },
  { name: "Bottoms", image: img("photo-1541099649105-f69ad21f3246") },
  { name: "Knitwear", image: img("photo-1434389677669-e08b4cac3105") },
  { name: "Outerwear", image: img("photo-1551028719-00167b16eac5") },
];

export const getProduct = (id) =>
  products.find((p) => String(p.id) === String(id));

export const relatedProducts = (id, n = 4) => {
  const current = getProduct(id);
  if (!current) return products.slice(0, n);
  return products
    .filter((p) => p.id !== current.id && p.gender === current.gender)
    .slice(0, n);
};
