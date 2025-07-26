"use client";

import { useEffect } from "react";
import {
  ClockIcon,
  Heart,
  Shield,
  Skull,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Section, Block, Box, RText } from "@/lib/by/Div";
import Button from "@/components/CustomButton";

interface GamePlayProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  score: number;
  timeLeft: number;
  powerUp: PowerUp | null;
  selectedMode: string;
  currentModeName: string;
  onEndGame: () => void;
  CANVAS_WIDTH: number;
  CANVAS_HEIGHT: number;
}

export default function GamePlayScreen({
  canvasRef,
  score,
  timeLeft,
  powerUp,
  selectedMode,
  currentModeName,
  onEndGame,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
}: GamePlayProps) {
  // Focus canvas on mount
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.focus();
    }
  }, [canvasRef]);

  return (
    <Section className="flex flex-col md:flex-row gap-6 items-start justify-evenly w-full max-w-7xl mx-auto px-4">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border-[3px] border-purple-300 shadow-[0_4px_12px_rgba(128,0,255,0.2)] rounded-2xl outline-none"
        tabIndex={0}
      />

      {/* Sidebar */}
      <Block className="w-full md:w-80 bg-white rounded-2xl shadow-xl p-5 space-y-5 border border-slate-200">
        {/* MODE */}
        <Box
          className={`text-center text-sm font-semibold px-3 py-1 rounded-full shadow-inner uppercase tracking-wide
        ${
          selectedMode === "official"
            ? "bg-gradient-to-r from-pink-100 to-purple-200 text-purple-700"
            : "bg-gradient-to-r from-green-100 to-emerald-200 text-green-700"
        }
      `}
        >
          <RText>{currentModeName}</RText>
        </Box>

        {/* SCORE */}
        <Box className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl shadow-md flex items-center justify-between">
          <Box className="flex items-center gap-2">
            <Trophy className="text-yellow-600 w-5 h-5" />
            <RText className="font-bold text-gray-700">Score</RText>
          </Box>
          <RText className="text-xl font-extrabold text-orange-600">
            {score}
          </RText>
        </Box>

        {/* TIME */}
        <Box className="bg-gradient-to-r from-blue-100 to-sky-200 p-4 rounded-xl shadow-md flex items-center justify-between">
          <Box className="flex items-center gap-2">
            <ClockIcon className="text-blue-600 w-5 h-5" />
            <RText className="font-bold text-gray-700">Time Left</RText>
          </Box>
          <RText className="text-xl font-extrabold text-blue-700">
            {timeLeft}s
          </RText>
        </Box>

        {/* POWER-UP */}
        {powerUp && powerUp.timeLeft > 0 && (
          <Box className="bg-gradient-to-r from-yellow-300 to-orange-300 p-4 rounded-xl shadow-lg animate-pulse flex items-center gap-2 text-yellow-900 font-bold">
            <Sparkles className="w-5 h-5" />
            <RText>×{powerUp.value} Power Boost</RText>
            <RText className="ml-auto">{Math.ceil(powerUp.timeLeft)}s</RText>
          </Box>
        )}

        {/* LEGEND */}
        <Block className="space-y-2">
          <Box className="flex items-center gap-2 text-green-700">
            <Heart className="w-4 h-4" />
            <RText className="text-sm">Vitamin: +points</RText>
          </Box>
          <Box className="flex items-center gap-2 text-orange-700">
            <Skull className="w-4 h-4" />
            <RText className="text-sm">Harmful: -points</RText>
          </Box>
          <Box className="flex items-center gap-2 text-yellow-700">
            <Sparkles className="w-4 h-4" />
            <RText className="text-sm">Power-up: ×2 / ×3</RText>
          </Box>
          <Box className="flex items-center gap-2 text-slate-600">
            <Shield className="w-4 h-4" />
            <RText className="text-sm">A/D to move</RText>
          </Box>
        </Block>

        {/* PAUSE BUTTON */}
        <Button
          onClick={onEndGame}
          variant="outline"
          label="Give Up"
          className="w-full border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-semibold py-2 rounded-xl"
        />
      </Block>
    </Section>
  );
}
