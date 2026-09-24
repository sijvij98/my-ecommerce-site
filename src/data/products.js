// Dummy product catalog. Replace with your real products / API later.
export const products = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    category: "Electronics",
    image: "https://picsum.photos/seed/headphones-nx/640/640",
    description:
      "Premium over-ear wireless headphones with active noise cancellation, 40-hour battery life and crystal-clear sound.",
    rating: 4.8,
    reviews: 214,
    stock: 25,
    featured: true,
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    price: 199.99,
    category: "Electronics",
    image: "https://picsum.photos/seed/smartwatch-nx/640/640",
    description:
      "Track your fitness, heart rate, sleep and notifications with this sleek smartwatch. Water resistant up to 50m.",
    rating: 4.6,
    reviews: 167,
    stock: 18,
    featured: true,
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    price: 49.99,
    category: "Electronics",
    image: "https://picsum.photos/seed/speaker-nx/640/640",
    description:
      "Compact waterproof speaker with 360° sound, 20-hour playtime and deep bass. Perfect for outdoors.",
    rating: 4.5,
    reviews: 98,
    stock: 40,
    featured: true,
  },
  {
    id: "4",
    name: "Classic Cotton T-Shirt",
    price: 24.99,
    category: "Fashion",
    image: "https://picsum.photos/seed/tshirt-nx/640/640",
    description:
      "Soft 100% cotton t-shirt with a modern fit. Available in multiple colours, machine washable.",
    rating: 4.4,
    reviews: 320,
    stock: 100,
    featured: true,
  },
  {
    id: "5",
    name: "Denim Jacket",
    price: 89.99,
    category: "Fashion",
    image: "https://picsum.photos/seed/denim-nx/640/640",
    description:
      "Timeless denim jacket made from durable, comfortable denim. A wardrobe essential for every season.",
    rating: 4.7,
    reviews: 145,
    stock: 30,
    featured: false,
  },
  {
    id: "6",
    name: "Running Sneakers",
    price: 119.99,
    category: "Fashion",
    image: "https://picsum.photos/seed/sneakers-nx/640/640",
    description:
      "Lightweight running sneakers with cushioned soles and breathable mesh for maximum comfort.",
    rating: 4.9,
    reviews: 412,
    stock: 22,
    featured: true,
  },
  {
    id: "7",
    name: "Ceramic Coffee Mug Set",
    price: 34.99,
    category: "Home",
    image: "https://picsum.photos/seed/mugs-nx/640/640",
    description:
      "Set of 4 handcrafted ceramic mugs (350ml each). Dishwasher and microwave safe.",
    rating: 4.6,
    reviews: 76,
    stock: 55,
    featured: false,
  },
  {
    id: "8",
    name: "LED Desk Lamp",
    price: 45.99,
    category: "Home",
    image: "https://picsum.photos/seed/lamp-nx/640/640",
    description:
      "Modern LED desk lamp with 5 colour temperatures, touch controls and USB charging port.",
    rating: 4.5,
    reviews: 89,
    stock: 35,
    featured: true,
  },
  {
    id: "9",
    name: "Cozy Throw Blanket",
    price: 39.99,
    category: "Home",
    image: "https://picsum.photos/seed/blanket-nx/640/640",
    description:
      "Ultra-soft plush throw blanket (130x170cm). Perfect for the sofa, bed or chilly evenings.",
    rating: 4.8,
    reviews: 203,
    stock: 48,
    featured: false,
  },
  {
    id: "10",
    name: "Yoga Mat Pro",
    price: 29.99,
    category: "Sports",
    image: "https://picsum.photos/seed/yogamat-nx/640/640",
    description:
      "6mm non-slip yoga mat with alignment lines and carry strap. Sweat-resistant and easy to clean.",
    rating: 4.7,
    reviews: 178,
    stock: 60,
    featured: true,
  },
  {
    id: "11",
    name: "Dumbbell Set 20kg",
    price: 99.99,
    category: "Sports",
    image: "https://picsum.photos/seed/dumbbell-nx/640/640",
    description:
      "Adjustable dumbbell set (2 x 10kg) with secure spin-lock collars and textured grips.",
    rating: 4.6,
    reviews: 92,
    stock: 15,
    featured: false,
  },
  {
    id: "12",
    name: "Insulated Water Bottle",
    price: 27.99,
    category: "Sports",
    image: "https://picsum.photos/seed/bottle-nx/640/640",
    description:
      "1L stainless steel insulated bottle. Keeps drinks cold for 24h or hot for 12h. BPA-free.",
    rating: 4.9,
    reviews: 540,
    stock: 80,
    featured: true,
  },
];

export const categories = ["All", ...new Set(products.map((p) => p.category))];

export function getProductById(id) {
  return products.find((p) => p.id === String(id));
}

export function getRelatedProducts(id, limit = 4) {
  const current = getProductById(id);
  if (!current) return [];
  return products
    .filter((p) => p.id !== String(id) && p.category === current.category)
    .concat(products.filter((p) => p.id !== String(id) && p.category !== current.category))
    .slice(0, limit);
}

export const FREE_SHIPPING_THRESHOLD = 50;
export const SHIPPING_FLAT_RATE = 4.99;

export function formatPrice(value) {
  return `$${Number(value).toFixed(2)}`;
}
