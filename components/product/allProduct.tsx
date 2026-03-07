import { fetchAllProducts } from "@/lib/data/products";
import { Product } from "@/lib/type/product";
import PopularProduct from "../popular-product";

export default async function AllProducts() {
  const data: Product[] = await fetchAllProducts();
  const products = data.slice(0, 10);

  return (
    <div className="mb-10">
      <PopularProduct products={products} />
    </div>
  );
}