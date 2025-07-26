"use client";

import { useEffect, useRef, useCallback } from "react";
import { Section } from "@/lib/by/Div";
import { useImageLoader } from "@/hooks/useImageLoader";
import GameUI from "./gameUI";

interface GameCanvasProps {
  gameLogic: GameLogic;
  selectedMode: string;
  currentMode: GameMode;
  onEndGame: () => void;
}

export default function GameCanvas({
  gameLogic,
  selectedMode,
  currentMode,
  onEndGame,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { imagesRef } = useImageLoader();

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, gameLogic.CANVAS_HEIGHT);
    if (selectedMode === "practice") {
      gradient.addColorStop(0, "#E8F5E8");
      gradient.addColorStop(0.5, "#F0F8F0");
      gradient.addColorStop(1, "#F8FFF8");
    } else {
      gradient.addColorStop(0, "#F3E5F5");
      gradient.addColorStop(0.5, "#FCE4EC");
      gradient.addColorStop(1, "#FFF3E0");
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, gameLogic.CANVAS_WIDTH, gameLogic.CANVAS_HEIGHT);

    // Power-up effect
    if (gameLogic.powerUp && gameLogic.powerUp.timeLeft > 0) {
      const alpha = 0.05 + Math.sin(Date.now() * 0.005) * 0.02;
      ctx.fillStyle = `rgba(255, 193, 7, ${alpha})`;
      ctx.fillRect(0, 0, gameLogic.CANVAS_WIDTH, gameLogic.CANVAS_HEIGHT);
    }

    // Draw basket
    const basketGradient = ctx.createLinearGradient(
      gameLogic.basket.x,
      gameLogic.basket.y,
      gameLogic.basket.x,
      gameLogic.basket.y + gameLogic.basket.height,
    );
    if (gameLogic.powerUp) {
      basketGradient.addColorStop(0, "#FFE082");
      basketGradient.addColorStop(1, "#FFCC02");
    } else {
      basketGradient.addColorStop(
        0,
        selectedMode === "practice" ? "#C8E6C9" : "#D7CCC8",
      );
      basketGradient.addColorStop(
        1,
        selectedMode === "practice" ? "#A5D6A7" : "#A1887F",
      );
    }
    ctx.fillStyle = basketGradient;
    ctx.fillRect(
      gameLogic.basket.x,
      gameLogic.basket.y,
      gameLogic.basket.width,
      gameLogic.basket.height,
    );

    // Basket handle
    ctx.strokeStyle = gameLogic.powerUp
      ? "#FF8F00"
      : selectedMode === "practice"
        ? "#66BB6A"
        : "#8D6E63";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(
      gameLogic.basket.x + gameLogic.basket.width / 2,
      gameLogic.basket.y + 10,
      15,
      0,
      Math.PI,
      true,
    );
    ctx.stroke();

    // Draw game items
    gameLogic.gameItems.forEach((item: GameItem) => {
      ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 3;

      const circleRadius = 14;
      const itemGradient = ctx.createRadialGradient(
        item.x - 6,
        item.y - 6,
        0,
        item.x,
        item.y,
        circleRadius,
      );
      itemGradient.addColorStop(0, "#FFFFFF");
      itemGradient.addColorStop(0.7, item.color);
      itemGradient.addColorStop(1, item.color);
      ctx.fillStyle = itemGradient;
      ctx.beginPath();
      ctx.arc(item.x, item.y, circleRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.strokeStyle = item.type === "harmful" ? "#E57373" : "#FFFFFF";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const imageKey =
        item.type === "multiplier" ? `x${item.multiplier}` : item.name!;
      const image = imagesRef.current[imageKey];

      if (image) {
        const imageSize = 40;
        ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
        ctx.shadowBlur = 6;
        ctx.shadowOffsetY = 3;

        ctx.drawImage(
          image,
          item.x - imageSize / 2,
          item.y - imageSize / 2,
          imageSize,
          imageSize,
        );
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = item.type === "harmful" ? "#FFFFFF" : "#2E2E2E";
        ctx.font =
          item.type === "harmful" ? "bold 16px Arial" : "bold 20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if (item.type === "multiplier") {
          ctx.fillText(`×${item.multiplier}`, item.x, item.y);
        } else {
          ctx.fillText(item.name!, item.x, item.y);
        }
      }
    });

    ctx.shadowBlur = 0;
  }, [gameLogic, selectedMode, imagesRef]);

  const gameLoop = useCallback(() => {
    gameLogic.updateGame();
    draw();
    gameLogic.gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameLogic, draw]);

  useEffect(() => {
    gameLogic.gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameLogic.gameLoopRef.current) {
        cancelAnimationFrame(gameLogic.gameLoopRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameLoop]);

  return (
    <Section className="flex flex-col md:flex-row gap-6 items-start justify-evenly w-full max-w-7xl mx-auto px-4">
      <canvas
        ref={canvasRef}
        width={gameLogic.CANVAS_WIDTH}
        height={gameLogic.CANVAS_HEIGHT}
        className="border-[3px] border-purple-300 shadow-[0_4px_12px_rgba(128,0,255,0.2)] rounded-2xl"
        tabIndex={0}
      />

      <GameUI
        score={gameLogic.score}
        timeLeft={gameLogic.timeLeft}
        powerUp={gameLogic.powerUp}
        currentMode={currentMode}
        selectedMode={selectedMode}
        onEndGame={onEndGame}
      />
    </Section>
  );
}
