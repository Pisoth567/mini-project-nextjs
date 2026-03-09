import { fetchAllProducts } from "@/lib/data/products";
import { Product } from "@/lib/type/product";
import Image from "next/image";

export default async function View() {
  const products: Product[] = await fetchAllProducts();

  return (
    <table className="border w-full">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Price</th>
          <th>Image</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.title}</td>
            <td>${p.price}</td>
            <td>
              <Image height={100} src={p.images?.[0]} width={50} alt="Image" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}