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
  return <Card className="space-y-3 sm:space-y-4  p-8 pb-4"><Carousel images={images} discount={discount} productName={productName}  /></Card>;
}
