import { fetchAllProducts } from "@/lib/data/products";
import { Product } from "@/lib/type/product";

export default async function FilterProductByCategory() {
  const data: Product[] = await fetchAllProducts();

  const filteredProductCategories = data.find(pro => pro.category.name === "Clothes");
    console.log( "filtered Product Categories: "+ filteredProductCategories);
    
  return (
    <main className="w-[80%] mx-auto py-8">
        {/* {filteredProducts} */}
    </main>
  );
}