"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Row, Begin } from "@/lib/by/Div";
import { times } from "lodash";

type CarouselProps = {
  images: string[];
  productName: string;
  discount: number;
};

export function Carousel({ images, productName, discount }: CarouselProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const onPrevImage = () =>
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

  const onNextImage = () =>
    setSelectedImage((prev) => (prev + 1) % images.length);

  const onThumbnailClick = (index: number) => setSelectedImage(index);

  return (
    <>
      <Begin className="relative group">
        <Begin className="block w-full h-full aspect-square  bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg relative">
          <Image
            src={images[selectedImage]}
            alt={productName}
            fill
            sizes="(max-width: 768px) 100vw"
            className="object-cover group-hover:scale-105 aspect-square  transition-transform duration-500"
            priority
          />
          {discount && 
          <Begin className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 w-auto">
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium">
              -{discount}%
            </span>
          </Begin>
          }
        </Begin>


        {/* prev Button */}
        <button
          onClick={onPrevImage}
          className="w-9 absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-lg hover:bg-white transition-opacity opacity-0 group-hover:opacity-100 z-10"
          type="button"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* next Button */}
        <button
          onClick={onNextImage}
          className="w-9 absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-lg hover:bg-white transition-opacity opacity-0 group-hover:opacity-100 z-10"
          type="button"
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-0" />
        </button>
      </Begin>

      <Row className="flex space-x-2 sm:space-x-3 justify-center overflow-x-auto py-2">
        {times(images.length, (index: number) => (
          <button
            key={index}
            onClick={() => onThumbnailClick(index)}
            className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden transition-all ${
              selectedImage === index
          ? "ring-2 ring-pink-400 ring-offset-2"
          : "hover:ring-2 hover:ring-pink-200 hover:ring-offset-2"
            }`}
            type="button"
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={images[index]}
              alt={`Thumbnail ${index + 1}`}
              width={80}
              height={80}
              className="object-cover"
              priority={selectedImage === index}
            />
          </button>
        ))}
      </Row>
    </>
  );
}
