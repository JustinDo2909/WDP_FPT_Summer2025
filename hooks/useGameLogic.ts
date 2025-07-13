"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { VITAMINS, HARMFUL_ITEMS, MULTIPLIERS } from "@/constants";
type GameState = "menu" | "modeSelect" | "playing" | "gameOver";
export function useGameLogic(
  gameModes: { [key: string]: GameMode },
  selectedMode: string,
  gameState: string,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameItems, setGameItems] = useState<GameItem[]>([]);
  const [basket, setBasket] = useState<Basket>({
    x: 350,
    y: 520,
    width: 100,
    height: 60,
  });
  const [powerUp, setPowerUp] = useState<PowerUp | null>(null);

  const gameLoopRef = useRef<number>(1);
  const keysRef = useRef<Set<string>>(new Set());
  const lastUpdateRef = useRef<number>(Date.now());

  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const currentMode = gameModes[selectedMode] || gameModes.practice;

  const spawnItem = useCallback(() => {
    if (Math.random() < currentMode.settings.spawnRate) {
      const rand = Math.random();
      let newItem: GameItem;

      if (rand < currentMode.settings.vitaminChance) {
        const vitaminType =
          VITAMINS[Math.floor(Math.random() * VITAMINS.length)];
        newItem = {
          id: Date.now() + Math.random(),
          x: Math.random() * (CANVAS_WIDTH - 60) + 30,
          y: -50,
          type: "vitamin",
          name: vitaminType.name,
          color: vitaminType.color,
          speed:
            Math.random() *
              (currentMode.settings.itemSpeed.max -
                currentMode.settings.itemSpeed.min) +
            currentMode.settings.itemSpeed.min,
          points: vitaminType.points,
          imageUrl: vitaminType.imageUrl,
        };
      } else if (
        rand <
        currentMode.settings.vitaminChance + currentMode.settings.harmfulChance
      ) {
        const harmfulType =
          HARMFUL_ITEMS[Math.floor(Math.random() * HARMFUL_ITEMS.length)];
        newItem = {
          id: Date.now() + Math.random(),
          x: Math.random() * (CANVAS_WIDTH - 60) + 30,
          y: -50,
          type: "harmful",
          name: harmfulType.name,
          color: harmfulType.color,
          speed:
            Math.random() *
              (currentMode.settings.itemSpeed.max -
                currentMode.settings.itemSpeed.min) +
            currentMode.settings.itemSpeed.min,
          points: harmfulType.points,
          imageUrl: harmfulType.imageUrl,
        };
      } else {
        const multiplierRand = Math.random();
        const multiplierType =
          selectedMode === "practice"
            ? multiplierRand < 0.8
              ? MULTIPLIERS[0]
              : MULTIPLIERS[1]
            : multiplierRand < 0.7
              ? MULTIPLIERS[0]
              : MULTIPLIERS[1];

        newItem = {
          id: Date.now() + Math.random(),
          x: Math.random() * (CANVAS_WIDTH - 60) + 30,
          y: -50,
          type: "multiplier",
          multiplier: multiplierType.value,
          color: multiplierType.color,
          speed:
            Math.random() *
              (currentMode.settings.itemSpeed.max -
                currentMode.settings.itemSpeed.min) +
            currentMode.settings.itemSpeed.min * 0.8,
          points: multiplierType.points,
          imageUrl: multiplierType.imageUrl,
        };
      }

      setGameItems((prev) => [...prev, newItem]);
    }
  }, [currentMode, selectedMode, CANVAS_WIDTH]);

  const updateGame = useCallback(() => {
    setBasket((prev) => {
      let newX = prev.x;
      if (keysRef.current.has("ArrowLeft") || keysRef.current.has("a")) {
        newX = Math.max(0, prev.x - currentMode.settings.basketSpeed);
      }
      if (keysRef.current.has("ArrowRight") || keysRef.current.has("d")) {
        newX = Math.min(
          CANVAS_WIDTH - prev.width,
          prev.x + currentMode.settings.basketSpeed
        );
      }
      return { ...prev, x: newX };
    });

    const now = Date.now();
    const deltaTime = (now - lastUpdateRef.current) / 1000;
    lastUpdateRef.current = now;

    setPowerUp((prev) => {
      if (prev && prev.timeLeft > 0) {
        const newTime = prev.timeLeft - deltaTime;
        return newTime > 0 ? { ...prev, timeLeft: newTime } : null;
      }
      return null;
    });

    setGameItems((prev) => {
      const updatedItems = prev
        .map((item) => ({ ...item, y: item.y + item.speed }))
        .filter((item) => item.y < CANVAS_HEIGHT + 60);

      const remainingItems: GameItem[] = [];
      let scoreChange = 0;

      updatedItems.forEach((item) => {
        const itemCenterX = item.x;
        const itemCenterY = item.y;
        const itemRadius = 30;

        if (
          itemCenterX + itemRadius > basket.x &&
          itemCenterX - itemRadius < basket.x + basket.width &&
          itemCenterY + itemRadius > basket.y &&
          itemCenterY - itemRadius < basket.y + basket.height
        ) {
          if (item.type === "multiplier") {
            const powerUpDuration = selectedMode === "practice" ? 7 : 5;
            setPowerUp({
              type: "multiplier",
              value: item.multiplier!,
              timeLeft: powerUpDuration,
            });
          } else {
            let points = item.points;
            if (powerUp && powerUp.type === "multiplier") {
              points *= powerUp.value;
            }
            scoreChange += points;
          }
        } else {
          remainingItems.push(item);
        }
      });

      if (scoreChange !== 0) {
        setScore((prev) => Math.max(0, prev + scoreChange));
      }

      return remainingItems;
    });

    spawnItem();
  }, [
    basket.x,
    basket.y,
    basket.width,
    basket.height,
    spawnItem,
    powerUp,
    currentMode,
    selectedMode,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
  ]);

  const startGame = (mode: string) => {
    setScore(0);
    setTimeLeft(gameModes[mode].settings.gameTime);
    setGameItems([]);
    const modeSettings = gameModes[mode].settings;
    setBasket({
      x: 350,
      y: 520,
      width: modeSettings.basketSize.width,
      height: modeSettings.basketSize.height,
    });
    setPowerUp(null);
  };

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "playing" && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === "playing") {
      setGameState("gameOver");
    }
    return () => clearTimeout(timer);
  }, [gameState, timeLeft, setGameState]);

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return {
    score,
    timeLeft,
    gameItems,
    basket,
    powerUp,
    gameLoopRef,
    updateGame,
    startGame,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
  };
}
