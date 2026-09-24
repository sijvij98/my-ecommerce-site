import ProductListing from "@/components/ProductListing";

export const metadata = {
  title: "All Products — ShopNext",
  description: "Browse the full ShopNext product catalog.",
};

export default function ProductsPage({ searchParams }) {
  const initialCategory = searchParams?.category || "All";
  return <ProductListing initialCategory={initialCategory} />;
}
