"use client"

import { useState } from "react"
import { slides } from "@/lib/data/images-slide"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function SlideShow() {
    const [currentIndex, setCurrentIndex] = useState(0)
    
    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        )
    }
    
    const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        )
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            <div className="relative aspect-16/7 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl group">
                {/* Current Slide */}
                <div className="relative w-full h-full">
                    <Image
                        src={slides[currentIndex]}
                        alt={`Slide ${currentIndex + 1}`}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Navigation Buttons - Always visible on desktop, on hover on mobile */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 md:opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                
                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 md:opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Slide Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
                    {currentIndex + 1} / {slides.length}
                </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center mt-4 gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                            index === currentIndex 
                                ? "w-8 bg-blue-600" 
                                : "w-2.5 bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}