'use client'
import { useState } from 'react';

export const useProductActions = (initial = 1, min = 1, max = 99) => {
  const [quantity, setQuantity] = useState(initial);

  //#region 
  const increment = () => {
    setQuantity((prev) => (prev < max ? prev + 1 : prev));
  };
  //#endregion

  //#region 
  const decrement = () => {
    setQuantity((prev) => (prev > min ? prev - 1 : prev));
    //#endregion
  };

  return { quantity, increment, decrement, setQuantity };
};
