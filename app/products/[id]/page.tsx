import { fetchAllProducts } from "@/lib/data/products";
import { Star } from "lucide-react";
import { Product } from "@/lib/type/product";
import { ProductGallery } from "./image-gallery";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const allProducts: Product[] = await fetchAllProducts();

  const product = allProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <main className="text-center py-20">
        <p className="text-gray-500 text-lg">Product not found.</p>
      </main>
    );
  }

  return (
    <main className="w-[80%] max-w-6xl mx-auto py-10 px-4 flex flex-col lg:flex-row gap-10">
      {/* Images with thumbnail gallery */}
      <div className="flex-1">
        {product.images && product.images.length > 0 ? (
          <ProductGallery images={product.images} title={product.title} />
        ) : (
          <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
            No image available
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 space-y-4">
        <p className="text-sm text-blue-600 font-medium">
          {product.category?.name || "Uncategorized"}
        </p>

        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

        <div className="flex items-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 fill-current ${
                i < 4 ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-gray-500 text-sm">(4.0)</span>
        </div>

        <p className="text-gray-700 text-lg">{product.description}</p>

        <p className="text-2xl font-bold text-yellow-600">${product.price}</p>

        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          Add to Cart
        </button>

        <p className="text-sm text-gray-400">
          Created at: {new Date(product.creationAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-400">
          Updated at: {new Date(product.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </main>
  );
}

