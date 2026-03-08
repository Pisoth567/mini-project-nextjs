"use client";

import { Product } from "@/lib/type/product";
import { useCart } from "@/components/context/CartContext";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
    >
      Add to Cart
    </button>
  );
}