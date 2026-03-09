import { categories} from "@/lib/data/products";
import CreateProductForm from "./categories";

export default function CreatePage(){
    
    return <CreateProductForm getData={categories()}/>
}