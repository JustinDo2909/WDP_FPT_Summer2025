"use client";

import { useEffect, useRef, useState } from "react";
import { VITAMINS, HARMFUL_ITEMS, MULTIPLIERS } from "@/constants";

export function useImageLoader() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<{ [key: string]: HTMLImageElement }>({});

  useEffect(() => {
    const imagePromises: Promise<void>[] = [];
    const imageMap: { [key: string]: HTMLImageElement } = {};

    const allImages = [
      ...VITAMINS.map((v) => ({ key: v.name, url: v.imageUrl })),
      ...HARMFUL_ITEMS.map((h) => ({ key: h.name, url: h.imageUrl })),
      ...MULTIPLIERS.map((m) => ({ key: `x${m.value}`, url: m.imageUrl })),
    ];

    allImages.forEach(({ key, url }) => {
      const img = new Image(40, 40);
      img.crossOrigin = "anonymous";

      const promise = new Promise<void>((resolve) => {
        img.onload = () => {
          imageMap[key] = img;
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load image: ${url}`);
          resolve();
        };
      });

      img.src = url;
      imagePromises.push(promise);
    });

    Promise.all(imagePromises).then(() => {
      imagesRef.current = imageMap;
      setImagesLoaded(true);
    });
  }, []);

  return { imagesLoaded, imagesRef };
}
