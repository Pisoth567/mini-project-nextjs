import { cache } from "react";
import { Category, Product, ProductRequest } from "../type/product";

export async function fetchAllProducts(){
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`, {cache: "no-store"});
    const res = await data.json();
    return res;
}

export function fetchClientComponents(){
    const data = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`);
    return data
}

export async function getCategories() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`).then(res=>res.json());
  return response;
}

export function categories() {
  const data = fetch("https://api.escuelajs.co/api/v1/categories/").then(res=>res.json())
  return data
}

export async function getProductById(id: string){
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`);
    const res:Product[] = await data.json();
    const user = res.find((u)=> u.id === Number(id));
    return user;    
}

// insert Product to API
export async function insertProduct(product: ProductRequest){
    const data = await fetch("https://api.escuelajs.co/api/v1/products",{
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(product)
    }
    )
    const res = await data.json()
    return res;
}
