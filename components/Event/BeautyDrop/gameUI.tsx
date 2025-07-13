"use client";

import {
  Clock,
  Heart,
  Shield,
  Skull,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { Block, Box, RText } from "@/lib/by/Div";
import Button from "@/components/CustomButton";

interface GameUIProps {
  score: number;
  timeLeft: number;
  powerUp: PowerUp | null;
  currentMode: GameMode;
  selectedMode: string;
  onEndGame: () => void;
}

export default function GameUI({
  score,
  timeLeft,
  powerUp,
  currentMode,
  selectedMode,
  onEndGame,
}: GameUIProps) {
  return (
    <Block className="w-full md:w-80 bg-white rounded-2xl shadow-xl p-5 space-y-5 border border-slate-200">
      <Box
        className={`text-center text-sm font-semibold px-3 py-1 rounded-full shadow-inner uppercase tracking-wide ${
          selectedMode === "official"
            ? "bg-gradient-to-r from-pink-100 to-purple-200 text-purple-700"
            : "bg-gradient-to-r from-green-100 to-emerald-200 text-green-700"
        }`}
      >
        <RText>{currentMode.name}</RText>
      </Box>

      <Box className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl shadow-md flex items-center justify-between">
        <Box className="flex items-center gap-2">
          <Trophy className="text-yellow-600 w-5 h-5" />
          <RText className="font-bold text-gray-700">Score</RText>
        </Box>
        <RText className="text-xl font-extrabold text-orange-600">
          {score}
        </RText>
      </Box>

      <Box className="bg-gradient-to-r from-blue-100 to-sky-200 p-4 rounded-xl shadow-md flex items-center justify-between">
        <Box className="flex items-center gap-2">
          <Clock className="text-blue-600 w-5 h-5" />
          <RText className="font-bold text-gray-700">Time Left</RText>
        </Box>
        <RText className="text-xl font-extrabold text-blue-700">
          {timeLeft}s
        </RText>
      </Box>

      {powerUp && powerUp.timeLeft > 0 && (
        <Box className="bg-gradient-to-r from-yellow-300 to-orange-300 p-4 rounded-xl shadow-lg animate-pulse flex items-center gap-2 text-yellow-900 font-bold">
          <Zap className="w-5 h-5" />
          <RText>×{powerUp.value} Power Boost</RText>
          <RText className="ml-auto">{Math.ceil(powerUp.timeLeft)}s</RText>
        </Box>
      )}

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
          <RText className="text-sm">← → or A/D to move</RText>
        </Box>
      </Block>

      <Button
        onClick={onEndGame}
        variant="outline"
        label="Give Up"
        className="w-full border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-semibold py-2 rounded-xl"
      />
    </Block>
  );
}
