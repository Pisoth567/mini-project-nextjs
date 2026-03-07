import { Category } from "../type/product";

export async function fetchAllProducts(){
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`);
    const res = await data.json();
    return res;
}

export function fetchClientComponents(){
    const data = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`);
    return data
}

export async function getCategories() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`);
  const res: Category[] = await response.json();
    console.log(res);
    
  return res;
}