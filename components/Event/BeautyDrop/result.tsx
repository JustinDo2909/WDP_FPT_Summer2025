"use client";

import { Home, RotateCcw, Target } from "lucide-react";
import { Block, Box, Card, RText, Section } from "@/lib/by/Div";
import Button from "@/components/CustomButton";

interface GameOverProps {
  rewardInfo?: EventReward;
  score: number;
  selectedMode: string;
  currentMode: GameMode;
  onPlayAgain: () => void;
  onModeSelect: () => void;
  onBackToMenu: () => void;
}

export default function GameOver({
  rewardInfo,
  score,
  selectedMode,
  currentMode,
  onPlayAgain,
  onModeSelect,
  onBackToMenu,
}: GameOverProps) {
  return (
    <Section className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm border border-purple-100 shadow-xl rounded-2xl p-6">
      <Block className="text-center">
        <Box className="flex items-center justify-center gap-3 mb-3">
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

      <Block className="text-center ">
        <RText className="text-6xl font-bold font-sans text-purple-700 drop-shadow-md">
          {score}
        </RText>
        <RText className="text-sm text-gray-600 font-medium tracking-wider uppercase mt-1">
          total points
        </RText>
      </Block>
      {rewardInfo?.is_new_high_score && (
        <Box className="mt-2 text-center">
          <RText className="text-sm text-green-600 font-semibold">
            New High Score!
          </RText>
        </Box>
      )}

      {rewardInfo && selectedMode === "official" && rewardInfo.success && (
        <Card className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-amber-100 border border-yellow-400 shadow-xl rounded-2xl px-5 py-4 mt-6 flex items-center justify-between gap-4">
          <Box className="absolute top-1/2 -left-3 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-yellow-300 shadow-md" />
          <Box className="absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-yellow-300 shadow-md" />

          {rewardInfo.reward && selectedMode === "official" ? (
            <>
              <Box className="flex-1 text-left">
                <RText className="text-base font-bold text-yellow-800">
                  🎉 Congratulations!
                </RText>

                <RText className="text-sm text-gray-600 mt-1">
                  {rewardInfo.reward.discountValue}
                </RText>

                <RText className="text-xs italic text-gray-500 mt-1">
                  Reward will be saved to your profile.
                </RText>
              </Box>

              <Box className="text-right min-w-[90px]">
                <RText className="text-3xl font-black text-orange-600">
                  {rewardInfo.reward?.discountType === "AMOUNT"
                    ? `₫${rewardInfo.reward.discountValue?.toLocaleString()}`
                    : "%"}
                </RText>
                <RText className="text-sm text-yellow-700 font-semibold">
                  OFF
                </RText>
              </Box>
            </>
          ) : rewardInfo.voucher_already_received ? (
            <Box className="flex-1 text-left">
              <RText className="text-base font-bold text-yellow-800">
                Notification
              </RText>

              <RText className="text-sm text-gray-600 mt-1">
                {rewardInfo.message}
              </RText>
            </Box>
          ) : (
            <Box className="flex-1 text-left">
              <RText className="text-base font-bold text-yellow-800">
                Notification
              </RText>

              <RText className="text-sm text-gray-600 mt-1">
                {rewardInfo.message}
              </RText>
            </Box>
          )}
        </Card>
      )}

      <Block className="space-y-3 mt-6">
        <Button
          onClick={onPlayAgain}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-xl"
          icon={<RotateCcw className="w-5 h-5 mr-2" />}
          label="Play Again"
        />

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
