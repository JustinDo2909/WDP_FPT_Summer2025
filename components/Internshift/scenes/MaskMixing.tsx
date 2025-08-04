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
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <h2 className="text-xl font-semibold mb-4 text-center text-yellow-800">
        Mix Your Mask
      </h2>
      <div className="relative w-full max-w-[360px] aspect-square flex items-center justify-center">
        {/* Radial ingredient icons */}
        {ingredients.map((ing, idx) => {
          const angle = (idx / ingredients.length) * 2 * Math.PI;
          const radius = 150;
          const x = Math.cos(angle) * radius + 180 - 30;
          const y = Math.sin(angle) * radius + 180 - 30;
          return (
            <div
              key={ing.tag}
              className="absolute z-10 cursor-grab select-none"
              style={{ left: x, top: y }}
              draggable={spoonsLeft > 0}
              onDragStart={() => handleDragStart(idx)}
              onDragEnd={handleDragEnd}
              onClick={() => handleDrop()}
              title={ing.name}
            >
              <div className="w-14 h-14 flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full border-2 border-yellow-400 bg-white flex items-center justify-center shadow-md transition-all ${
                    draggedIdx === idx ? "border-4" : ""
                  } ${spoonsLeft > 0 ? "opacity-100" : "opacity-50"}`}
                >
                  <span className="text-yellow-700 font-medium text-sm truncate max-w-[40px]">
                    {ing.name.split(" ")[0]}
                  </span>
                </div>
                <span className="text-xs mt-1 text-yellow-900">{ing.count}x</span>
              </div>
            </div>
          );
        })}

        {/* Center mixing area */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-yellow-600 bg-yellow-50 flex flex-col items-center justify-center shadow-lg transition-all"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {spoonsLeft > 0 && (
            <>
              <span className="text-yellow-900 text-base font-medium mb-1">
                Mixing Bowl
              </span>
              <span className="text-yellow-800 text-sm mb-2">
                Spoons left: {spoonsLeft}
              </span>
              <div className="flex flex-wrap gap-1.5 justify-center max-w-[120px] overflow-auto">
                {ingredients
                  .filter((ing) => ing.count > 0)
                  .map((ing) => (
                    <div
                      key={ing.tag}
                      className="bg-yellow-200 border border-yellow-400 rounded-full px-2 py-0.5 text-yellow-900 text-xs font-medium flex items-center gap-1 cursor-pointer hover:bg-yellow-300"
                      onClick={() =>
                        handleRemove(
                          ingredients.findIndex((i) => i.tag === ing.tag)
                        )
                      }
                      title="Remove one"
                    >
                      <span className="truncate max-w-[60px]">{ing.name}</span>
                      <span>x{ing.count}</span>
                    </div>
                  ))}
              </div>
            </>
          )}
          {spoonsLeft === 0 && (
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-yellow-900 text-lg font-semibold animate-bounce">
                Mixing<span className="animate-pulse">...</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Result overlay */}
      {result && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20 rounded-lg">
          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center max-w-[90%]">
            <span
              className={`text-xl font-semibold mb-2 ${
                result.success ? "text-green-600" : "text-yellow-700"
              }`}
            >
              {result.success ? "Perfect Mask!" : "Nice Try!"}
            </span>
            <span className="text-sm mb-2 text-center">
              {result.success
                ? "You matched the recipe and skin type!"
                : "You created a mask, but it wasn't a perfect match."}
            </span>
            <span className="text-base font-medium mb-4">
              Bonus: <span className="text-yellow-700">+₫{result.bonus}</span>
            </span>
            <button
              className="bg-yellow-500 text-white px-4 py-1.5 rounded-lg hover:bg-yellow-600 transition"
              onClick={handleReset}
            >
              Mix Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}