import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Product } from "@/lib/type/product"
import Image from "next/image"
import Link from "next/link"

type Props = {
  products: Product[]
}

export default function PopularProduct({ products }: Props) {
  return (
    <Carousel
      opts={{ align: "start" }}
      className="w-full"
    >
      <CarouselContent>
        {products.map((product) => (
            <CarouselItem key={product.id} className="basis-1/2 lg:basis-1/5">
            <div className="p-1">
              <Card className="hover:shadow-md">
                <CardContent className="px-2 ">
                  <Image
                    height={300}
                    width={400}
                    src={product.images[0]}
                    alt={product.title}
                    className="aspect-square w-full object-cover rounded-md hover:scale-105"
                  />
                  <h2 className="text-sm font-semibold mt-2 line-clamp-1">
                    {product.title}
                  </h2>
                  <p className="text-sm text-shadow-olive-400">{product.description.slice(0,20)}</p>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-yellow-600 font-bold">${product.price}</p>
                    <Link className="px-3 py-1 bg-green-400 hover:bg-green-500 rounded-xl text-taupe-100 hover:scale-105" href={`/products/${product.id}`}>Add</Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}