"use client";
import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, title }: { images: string[]; title: string }) {

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main large image */}
      <div className="w-full aspect-square bg-gray-50 rounded-lg overflow-hidden">
        <Image
          src={images[selectedImage] || "https://www.computerhope.com/jargon/u/user.png"}
          alt={title}
          width={500}
          height={500}
          className="object-cover rounded-lg w-full h-95"
          priority
        />

      {/* Thumbnail images */}
      <div className="flex gap-2 mt-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(i)}
            className={`shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
              selectedImage === i
                ? "border-blue-500 shadow-md"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <Image
              src={img || "https://www.computerhope.com/jargon/u/user.png"}
              alt={`${title} - view ${i + 1}`}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
      </div>

    </div>
  );
}