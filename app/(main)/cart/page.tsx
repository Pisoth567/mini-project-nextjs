"use client";

import { useCart } from "@/components/context/CartContext";
import Image from "next/image";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="w-[80%] mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
      </main>
    );
  }

  return (
    <main className="w-[80%] mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <table className="w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Image</th>
            <th className="p-3 border">Title</th>
            <th className="p-3 border">Category</th>
            <th className="p-3 border">Price</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((product) => (
            <tr key={product.id} className="text-center">
              
              <td className="p-3 border">
                <Image
                  src={product.images?.[0] || "https://www.computerhope.com/jargon/u/user.png"}
                  alt={product.title}
                  width={60}
                  height={60}
                  className="mx-auto"
                />
              </td>

              <td className="p-3 border">{product.title}</td>

              <td className="p-3 border">
                {product.category?.name}
              </td>

              <td className="p-3 border text-yellow-600 font-semibold">
                ${product.price}
              </td>

              <td className="p-3 border">
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}