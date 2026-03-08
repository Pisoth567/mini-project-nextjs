import AllProducts from "@/components/product/allProduct";
import SlideShow from "@/components/slide";

export default function Home(){
    return(
        <main className="w-[80%] mx-auto">
            <SlideShow />
            <p className="mt-10 font-bold">Most Products</p>
            <AllProducts />
        </main>
    )
}