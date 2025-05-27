// ProductImages.tsx
import React from "react";
import { Carousel } from "../ImageCarousel";
import { Card } from "@/lib/by/Div";

type ProductImagesProps = {
  images: string[];
  discount: number;
  productName: string;
  
};

export function ProductImages({images, discount, productName}:ProductImagesProps) {
  return <Card><Carousel images={images} discount={discount} productName={productName}  /></Card>;
}
