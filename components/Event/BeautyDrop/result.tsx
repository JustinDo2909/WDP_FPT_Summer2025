"use client";

import { Home, RotateCcw, Target, Trophy } from "lucide-react";
import { Block, Box, Card, RText, Section } from "@/lib/by/Div";
import Button from "@/components/CustomButton";
import { VOUCHER_REWARDS } from "@/constants";

interface GameOverProps {
  score: number;
  selectedMode: string;
  currentMode: GameMode;
  reward: EventReward | null;
  onPlayAgain: () => void;
  onModeSelect: () => void;
  onBackToMenu: () => void;
}

export default function GameOver({
  score,
  selectedMode,
  currentMode,
  reward,
  onPlayAgain,
  onModeSelect,
  onBackToMenu,
}: GameOverProps) {
  const getVoucherReward = (score: number) =>
    VOUCHER_REWARDS.find((v) => score >= v.min && score <= v.max);

  const getScoreMessage = () => {
    if (selectedMode === "official") {
      if (score >= 1200)
        return { text: "Unstoppable!", color: "text-purple-700" };
      if (score >= 900)
        return { text: "Elite Player!", color: "text-purple-600" };
      if (score >= 700)
        return { text: "Skilled Performance!", color: "text-green-600" };
      if (score >= 500)
        return { text: "Solid Effort!", color: "text-blue-600" };
      return { text: "Keep Practicing!", color: "text-orange-600" };
    } else {
      if (score >= 1500)
        return { text: "Ready for the challenge!", color: "text-green-600" };
      if (score >= 1200) return { text: "Very Good!", color: "text-green-600" };
      if (score >= 800) return { text: "Well Done!", color: "text-blue-600" };
      if (score >= 500) return { text: "Good Try!", color: "text-blue-500" };
      return { text: "Keep Training!", color: "text-orange-600" };
    }
  };

  const formatReward = (reward: EventReward | null) => {
    if (!reward || !reward.discount_value || !reward.type) {
      return "No reward";
    }
    return reward.type === "PERCENT"
      ? `${reward.discount_value}% voucher`
      : `₫${reward.discount_value.toLocaleString()} discount`;
  };

  const scoreMessage = getScoreMessage();
  const voucher = selectedMode === "official" ? getVoucherReward(score) : null;

  return (
    <Section className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm border border-purple-100 shadow-xl rounded-2xl p-6">
      <Block className="text-center mb-6">
        <Box className="flex items-center justify-center gap-3 mb-3">
          <Box className="p-3 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full">
            <Trophy className="w-8 h-8 text-yellow-600" />
          </Box>
          <Box className="text-2xl font-extrabold text-gray-800">Game Over</Box>
        </Box>
        <RText
          className={`text-sm px-3 py-1 rounded-full inline-block ${
            selectedMode === "official"
              ? "bg-purple-100 text-purple-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {currentMode.name}
        </RText>
      </Block>

      <Block className="text-center mb-4">
        <RText className="text-6xl font-extrabold text-purple-700 drop-shadow-md">
          {score}
        </RText>
        <RText className="text-sm text-gray-600 font-medium tracking-wider uppercase mt-1">
          total points
        </RText>
      </Block>

      <RText
        className={`text-lg font-semibold text-center ${scoreMessage.color} bg-gray-50 px-4 py-2 rounded-lg mb-3`}
      >
        {scoreMessage.text}
      </RText>

      {voucher && (
        <Card className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-amber-100 border border-yellow-400 shadow-xl rounded-2xl px-5 py-4 mt-6 flex items-center justify-between gap-4">
          <Box className="absolute top-1/2 -left-3 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-yellow-300 shadow-md" />
          <Box className="absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-yellow-300 shadow-md" />

          <Box className="flex-1 text-left">
            <RText className="text-base font-bold text-yellow-800">
              🎉 Congratulations!
            </RText>
            <RText className="text-sm text-gray-600 mt-1">
              {formatReward(reward)}
            </RText>
            <RText className="text-xs italic text-gray-500 mt-1">
              Voucher will be save to your profile.
            </RText>
          </Box>

          <Box className="text-right min-w-[90px]">
            <RText className="text-3xl font-black text-orange-600">
              {voucher.type === "AMOUNT"
                ? `₫${voucher.value.toLocaleString()}`
                : `${voucher.value}%`}
            </RText>
            <RText className="text-sm text-yellow-700 font-semibold">OFF</RText>
          </Box>
        </Card>
      )}

      {selectedMode === "official" && (
        <Box className="text-center mt-4">
          <RText className="text-sm text-red-500 font-semibold">
            You can only play Official Mode once per day. Come back tomorrow!
          </RText>
        </Box>
      )}

      <Block className="space-y-3 mt-6">
        {selectedMode !== "official" && (
          <Button
            onClick={onPlayAgain}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-xl"
            icon={<RotateCcw className="w-5 h-5 mr-2" />}
            label="Play Again"
          />
        )}

        <Button
          onClick={onModeSelect}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-xl"
          icon={<Target className="w-5 h-5 mr-2" />}
          label="Choose Mode"
        />

        <Button
          onClick={onBackToMenu}
          variant="outline"
          className="w-full border-2 border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl bg-transparent"
          icon={<Home className="w-5 h-5 mr-2" />}
          label="Back to Menu"
        />
      </Block>
    </Section>
  );
}
