import { Suspense } from "react";
import ProductListing from "../../components/ProductListing";

export const metadata = {
  title: "Shop All Clothing — URBANIQ",
  description:
    "Browse the Urbaniq collection: premium dresses, shirts, denim, knitwear and outerwear for women and men.",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="container" style={{ padding: "120px 0", textAlign: "center" }}>
          Loading the collection…
        </div>
      }
    >
      <ProductListing />
    </Suspense>
  );
}
