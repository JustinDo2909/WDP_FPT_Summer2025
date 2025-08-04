"use client";
import React, { useState, useMemo } from "react";
import { gameMaskIngredients, masks } from "@/constants/intershift-game";
import type { MaskIngredient, Mask } from "@/types/intershift";

const MAX_SPOONS = 5;

type IngredientWithCount = MaskIngredient & { count: number };

function getInitialIngredients(ingredients: MaskIngredient[]) {
  return ingredients.map((ing) => ({ ...ing, count: 0 }));
}

function maskMatch(
  recipe: { tag: string; quantity: number }[],
  selected: { tag: string; quantity: number }[]
) {
  if (recipe.length !== selected.length) return false;
  const sortedRecipe = [...recipe].sort((a, b) => a.tag.localeCompare(b.tag));
  const sortedSelected = [...selected].sort((a, b) => a.tag.localeCompare(b.tag));
  return sortedRecipe.every(
    (r, i) =>
      r.tag === sortedSelected[i].tag &&
      r.quantity === sortedSelected[i].quantity
  );
}

export default function MaskMixing({
  customerSkinType,
  onMixComplete,
}: {
  customerSkinType: string;
  onMixComplete: (success: boolean, bonus: number) => void;
}) {
  const [ingredients, setIngredients] = useState<IngredientWithCount[]>(
    getInitialIngredients(gameMaskIngredients)
  );
  const [spoonsLeft, setSpoonsLeft] = useState(MAX_SPOONS);
  const [isMixing, setIsMixing] = useState(false);
  const [result, setResult] = useState<null | {
    success: boolean;
    bonus: number;
  }>(null);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const maskRecipe: Mask | undefined = useMemo(
    () => masks.find((m) => m.case === customerSkinType),
    [customerSkinType]
  );

  const selectedIngredients = useMemo(
    () =>
      ingredients
        .filter((ing) => ing.count > 0)
        .map((ing) => ({
          tag: ing.tag,
          quantity: ing.count,
        })),
    [ingredients]
  );

  const handleDragStart = (idx: number) => setDraggedIdx(idx);
  const handleDragEnd = () => setDraggedIdx(null);

  const handleDrop = () => {
    if (draggedIdx === null || spoonsLeft <= 0) return;
    setIngredients((prev) =>
      prev.map((ing, idx) =>
        idx === draggedIdx && spoonsLeft > 0
          ? { ...ing, count: ing.count + 1 }
          : ing
      )
    );
    setSpoonsLeft((prev) => Math.max(0, prev - 1));
    setDraggedIdx(null);
  };

  const handleRemove = (idx: number) => {
    if (ingredients[idx].count > 0) {
      setIngredients((prev) =>
        prev.map((ing, i) =>
          i === idx ? { ...ing, count: ing.count - 1 } : ing
        )
      );
      setSpoonsLeft((prev) => Math.min(MAX_SPOONS, prev + 1));
    }
  };

  React.useEffect(() => {
    if (spoonsLeft === 0 && !isMixing) {
      setIsMixing(true);
      setTimeout(() => {
        let success = false;
        let bonus = 20;
        if (maskRecipe) {
          if (maskMatch(maskRecipe.ingredients, selectedIngredients)) {
            success = true;
            bonus = 80;
          }
        }
        setResult({ success, bonus });
        setIsMixing(false);
        onMixComplete(success, bonus);
      }, 1800);
    }
  }, [spoonsLeft, isMixing, maskRecipe, selectedIngredients, onMixComplete]);

  const handleReset = () => {
    setIngredients(getInitialIngredients(gameMaskIngredients));
    setSpoonsLeft(MAX_SPOONS);
    setResult(null);
    setIsMixing(false);
  };

  return (
  <div className="flex flex-col gap-6 items-center justify-center min-h-[75vh] p-6 bg-yellow-50 rounded-xl shadow-inner border border-yellow-100 max-w-4xl mx-auto">
    <h2 className="text-2xl font-bold text-yellow-800">Mix Your Mask</h2>

    {/* Bento Layout */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">

      {/* Ingredients box */}
      <div className="col-span-1 bg-white border border-yellow-300 rounded-lg p-4 shadow-md flex flex-wrap justify-center gap-3 min-h-[220px]">
        {ingredients.map((ing, idx) => (
          <div
            key={ing.tag}
            draggable={spoonsLeft > 0}
            onDragStart={() => handleDragStart(idx)}
            onDragEnd={handleDragEnd}
            onClick={() => handleDrop()}
            className={`cursor-grab select-none rounded-md bg-yellow-100 hover:bg-yellow-200 border border-yellow-300 p-2 w-[80px] h-[80px] flex flex-col items-center justify-center text-center text-sm font-medium text-yellow-900 shadow-sm transition ${
              draggedIdx === idx ? "ring-2 ring-yellow-500" : ""
            }`}
            title={ing.name}
          >
            <span className="truncate">{ing.name.split(" ")[0]}</span>
            <span className="text-xs mt-1">{ing.count}x</span>
          </div>
        ))}
      </div>

      {/* Mixing bowl center */}
      <div
        className="col-span-1 bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 shadow-lg flex flex-col items-center justify-center min-h-[220px]"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {spoonsLeft > 0 ? (
          <>
            <span className="text-yellow-900 text-base font-semibold mb-2">
              Mixing Bowl
            </span>
            <span className="text-yellow-800 text-sm mb-4">
              Spoons left: {spoonsLeft}
            </span>
            <div className="flex flex-wrap gap-2 justify-center max-w-[150px]">
              {ingredients
                .filter((ing) => ing.count > 0)
                .map((ing) => (
                  <div
                    key={ing.tag}
                    onClick={() =>
                      handleRemove(
                        ingredients.findIndex((i) => i.tag === ing.tag)
                      )
                    }
                    className="bg-white border border-yellow-400 px-2 py-1 rounded-full text-xs text-yellow-800 font-medium cursor-pointer hover:bg-yellow-200"
                    title="Remove one"
                  >
                    {ing.name} x{ing.count}
                  </div>
                ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="text-yellow-900 text-lg font-semibold animate-bounce">
              Mixing<span className="animate-pulse">...</span>
            </span>
          </div>
        )}
      </div>

      {/* Result box */}
      <div className="col-span-1 bg-white border border-yellow-300 rounded-lg p-4 shadow-md flex flex-col items-center justify-center min-h-[220px]">
        {result ? (
          <>
            <span
              className={`text-lg font-semibold mb-2 ${
                result.success ? "text-green-600" : "text-yellow-700"
              }`}
            >
              {result.success ? "Perfect Mask!" : "Nice Try!"}
            </span>
            <p className="text-sm mb-1 text-center">
              {result.success
                ? "You matched the recipe and skin type!"
                : "You created a mask, but it wasn't a perfect match."}
            </p>
            <span className="text-base font-medium mb-4 text-yellow-700">
              Bonus: ₫{result.bonus}
            </span>
            <button
              onClick={handleReset}
              className="bg-yellow-500 text-white px-4 py-1.5 rounded-lg hover:bg-yellow-600 transition"
            >
              Mix Again
            </button>
          </>
        ) : (
          <span className="text-sm text-yellow-600 text-center">
            Drop ingredients into the bowl to mix!
          </span>
        )}
      </div>
    </div>
  </div>
);

}