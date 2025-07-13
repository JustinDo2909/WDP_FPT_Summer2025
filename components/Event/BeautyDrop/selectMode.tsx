"use client";

import { Home, Star, Target } from "lucide-react";
import {
  Area,
  Block,
  Box,
  Card,
  Group,
  RText,
  Section,
  Yard,
} from "@/lib/by/Div";
import Button from "@/components/CustomButton";

interface ModeSelectProps {
  gameModes: { [key: string]: GameMode };
  onStartGame: (mode: string) => void;
  onBackToMenu: () => void;
}

export default function ModeSelect({
  gameModes,
  onStartGame,
  onBackToMenu,
}: ModeSelectProps) {
  return (
    <Area className="w-full max-w-4xl mx-auto">
      <Yard className="bg-white/95 backdrop-blur-sm border border-purple-100 shadow-lg rounded-xl p-6">
        <Section className="text-center pb-4">
          <Block className="text-3xl font-bold text-gray-800 mb-2">
            Select Game Mode
          </Block>
          <RText className="text-gray-600">
            Choose a mode that suits your skill level
          </RText>
        </Section>

        <Section className="space-y-6">
          <Block className="grid md:grid-cols-2 gap-6">
            {Object.entries(gameModes).map(([key, mode]) => (
              <Card
                key={key}
                className={`bg-gradient-to-br ${
                  key === "practice"
                    ? "from-green-50 to-emerald-50 border-green-200"
                    : "from-purple-50 to-pink-50 border-purple-200"
                } border-2 hover:border-opacity-80 transition-all duration-200 cursor-pointer group rounded-xl p-5`}
              >
                <Box className="text-center pb-4">
                  <Group className="flex items-center justify-center gap-2 mb-2">
                    <Box
                      className={`p-2 rounded-full ${key === "practice" ? "bg-green-100" : "bg-purple-100"} group-hover:bg-opacity-80`}
                    >
                      {key === "practice" ? (
                        <Star className="w-6 h-6 text-green-600" />
                      ) : (
                        <Target className="w-6 h-6 text-purple-600" />
                      )}
                    </Box>
                    <RText
                      className={`text-2xl font-bold ${key === "practice" ? "text-green-800" : "text-purple-800"}`}
                    >
                      {mode.name}
                    </RText>
                  </Group>
                  <RText
                    className={`${key === "practice" ? "text-green-700" : "text-purple-700"} font-medium`}
                  >
                    {mode.description}
                  </RText>
                </Box>

                <Box className="bg-white shadow-inner border border-gray-200 rounded-md text-center py-2 px-4 mb-3">
                  <RText className="text-lg font-bold text-gray-700 tracking-wider">
                    Game Time: {mode.settings.gameTime}s
                  </RText>
                </Box>

                <Box className="grid grid-cols-3 text-center gap-3 mb-3 text-sm">
                  <Box className="bg-white/80 rounded-md py-2 shadow">
                    <RText className="text-gray-500">Vitamin</RText>
                    <RText className="text-green-600 font-bold">
                      {Math.round(mode.settings.vitaminChance * 100)}%
                    </RText>
                  </Box>
                  <Box className="bg-white/80 rounded-md py-2 shadow">
                    <RText className="text-gray-500">Power-up</RText>
                    <RText className="text-yellow-600 font-bold">
                      {Math.round(mode.settings.multiplierChance * 100)}%
                    </RText>
                  </Box>
                  <Box className="bg-white/80 rounded-md py-2 shadow">
                    <RText className="text-gray-500">Harmful</RText>
                    <RText className="text-red-500 font-bold">
                      {Math.round(mode.settings.harmfulChance * 100)}%
                    </RText>
                  </Box>
                </Box>

                <Box className="grid grid-cols-3 gap-3 text-sm mb-4">
                  <Box className="bg-white/80 rounded-md py-2 px-3 text-center shadow">
                    <RText className="text-gray-500">Fall Speed</RText>
                    <RText className="font-semibold text-gray-700">
                      {key === "practice" ? "Slow" : "Medium"}
                    </RText>
                  </Box>
                  <Box className="bg-white/80 rounded-md py-2 px-3 text-center shadow">
                    <RText className="text-gray-500">Basket Size</RText>
                    <RText className="font-semibold text-gray-700">
                      {key === "practice" ? "Big" : "Medium"}
                    </RText>
                  </Box>
                  <Box className="bg-white/80 rounded-md py-2 px-3 text-center shadow">
                    <RText className="text-gray-500">Power-up</RText>
                    <RText className="font-semibold text-gray-700">
                      {key === "practice" ? "7s" : "5s"}
                    </RText>
                  </Box>
                </Box>

                <Button
                  onClick={() => onStartGame(key)}
                  label={`Play ${mode.name}`}
                  icon={
                    key === "practice" ? (
                      <Star className="w-5 h-5 mr-2" />
                    ) : (
                      <Target className="w-5 h-5 mr-2" />
                    )
                  }
                  className={`mt-2 w-full font-semibold py-3 rounded-xl ${
                    key === "practice"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  }`}
                />
                {key === "official" ? (
                  <RText className="text-xs text-red-600 mt-2 text-center font-semibold">
                    ⚠️ You can only play this mode once per day.
                  </RText>
                ) : (
                  <RText className="text-xs text-gray-500 mt-2 text-center">
                    Practice freely and improve your skills!
                  </RText>
                )}
              </Card>
            ))}
          </Block>

          <Block className="text-center">
            <Button
              onClick={onBackToMenu}
              variant="outline"
              label="Back to Menu"
              icon={<Home className="w-4 h-4 mr-2 bg-transparent" />}
              className="border-2 border-gray-200 hover:bg-gray-50 text-gray-700 px-6 py-2"
            />
          </Block>
        </Section>
      </Yard>
    </Area>
  );
}
