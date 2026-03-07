import { fetchAllProducts } from "@/lib/data/products"
import { Product } from "@/lib/type/product"
import Image from "next/image"
import { Star, Heart } from "lucide-react"
import Link from "next/link"

export default async function ProductPage() {
    const products: Product[] = await fetchAllProducts()
    const getProducts = products.slice(0, 50)

    return (
        <main className="w-[80%] mx-auto py-8">
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
                <p className="text-gray-600 text-lg">
                    Discover our amazing collection of {products.length} products
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {getProducts.map((product) => (
                    <Link
                        href={`/products/${product.id}`}
                        key={product.id}>
                        <div
                        className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                    >
                        <div className="relative h-38 w-full overflow-hidden bg-gray-100">
                            {product.images && product.images[0] ? (
                                <Image
                                    width={300}
                                    height={100}
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No image available
                                </div>
                            )}
                            
                            <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-50">
                                <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                            </button>
                            
                            {product.price && product.price < 50 && (
                                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                    SALE
                                </div>
                            )}
                        </div>

                        <div className="p-5">
                            <p className="text-sm text-blue-600 font-medium mb-2">
                                {product.category?.name || 'Uncategorized'}
                            </p>
                            
                            <h2 className="text-lg font-semibold text-gray-900 min-h-14 leading-5">
                                {product.title.slice(0, 25)+"..."}
                            </h2>
                            
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {product.description}
                            </p>
                            
                            <div className="flex items-center mb-3">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>
                                <span className="text-xs text-gray-500 ml-2">(4.5)</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-2xl font-bold text-yellow-600">
                                        ${product.price}
                                    </span>
                                    {product.price && (
                                        <span className="text-sm text-gray-400 line-through ml-2">
                                            ${Math.round(product.price * 1.2)}
                                        </span>
                                    )}
                                </div>
                                
                                <button className="p-2 px-3 bg-green-400 hover:bg-green-500 text-white rounded-lg transition-colors duration-200">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>

            {products.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No products found.</p>
                </div>
            )}
        </main>
    )
}