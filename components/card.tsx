import Image from "next/image";
import Link from "next/link";

type CardImageProps = {
  id: number;
  image: string;
  title: string;
  description: string;
};

export function ProductCard({ id, image, title, description }: CardImageProps) {
  return (
    <article className="rounded-xl overflow-hidden bg-gray-100 shadow hover:shadow-lg transition">
      
      <Image
        src={image}
        alt={title}
        width={400}
        height={250}
        className="aspect-video w-full object-cover brightness-75"
      />

      <div className="px-3 py-2">
        <div className="flex justify-between items-start gap-2">
          <h1 className="text-sm font-bold line-clamp-2">
            {title}
          </h1>

          <span className="bg-slate-300 text-xs px-2 py-1 rounded-full">
            feature
          </span>
        </div>

        <p className="text-xs text-gray-600 line-clamp-2 mt-1">
          {description}
        </p>

        <Link href={`/cart/${id}`}>
          <button className="w-full mt-3 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition">
            Buy
          </button>
        </Link>
      </div>

    </article>
  );
}