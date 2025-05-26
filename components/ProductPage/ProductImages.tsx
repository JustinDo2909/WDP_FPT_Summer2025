// ProductImages.tsx
import React from "react";
import { Carousel } from "../ImageCarousel";

type ProductImagesProps = {
  images: string[];
  discount: number;
  productName: string;
  
};

export function ProductImages({images, discount, productName}:ProductImagesProps) {
  return <Carousel images={images} discount={discount} productName={productName}  />;
}
