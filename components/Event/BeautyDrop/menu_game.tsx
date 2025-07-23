"use client";

import { Heart, Play, Sparkles, Skull, Zap, ArrowLeft } from "lucide-react";
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
import Image from "next/image";
import { VITAMINS, HARMFUL_ITEMS, MULTIPLIERS } from "@/constants";
import { Separator } from "@radix-ui/react-select";
import Link from "next/link";

interface GameMenuProps {
  onModeSelect: () => void;
}

export default function GameMenu({ onModeSelect }: GameMenuProps) {
  return (
    <Yard className="w-full max-w-7xl mx-auto">
      <Area className="backdrop-blur-sm border border-purple-100 shadow-lg p-5">
        <Link
          href={"/event"}
          className="absolute top-6 left-6 flex justify-center items-center group"
        >
          <ArrowLeft
            color="#333"
            className="group-hover:translate-x-[-4px] transition-transform"
          />
          <RText className="text-xl font-semibold text-[#333] group-hover:text-[#9333ea] transition-colors">
            Home
          </RText>
        </Link>
        <Section className="text-center">
          <Block className="flex items-center justify-center gap-3 mb-4">
            <Box className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </Box>
            <RText className="text-4xl font-bold text-gray-800">
              Beauty Catch Game
            </RText>
            <Box className="p-3 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full">
              <Heart className="w-8 h-8 text-pink-600" />
            </Box>
          </Block>
        </Section>

        <Section className="space-y-4">
          <Block className="text-center">
            <Button
              onClick={onModeSelect}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-12 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              label="Choose Game Mode"
              icon={<Play className="w-6 h-6 mr-3" />}
            />
          </Block>

          <Separator className="bg-gray-200" />

          <Block className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Beneficial Vitamins Card */}
            <Card className="bg-gradient-to-br from-green-100 via-emerald-50 to-green-200 border border-green-300 shadow-md hover:shadow-xl hover:scale-[1.03] rounded-xl transition-all duration-200 p-5">
              <Box className="pb-3">
                <Group className="flex items-center justify-center gap-2">
                  <Box className="p-2 bg-green-200 rounded-full">
                    <Heart className="w-5 h-5 text-green-700" />
                  </Box>
                  <RText className="text-lg font-bold text-green-800">
                    Beneficial Vitamins
                  </RText>
                </Group>
              </Box>
              <Box className="space-y-2">
                {VITAMINS.map((vitamin) => (
                  <Group
                    key={vitamin.name}
                    className="flex justify-evenly items-center py-2 bg-white/70 rounded-md shadow-sm"
                  >
                    <Image
                      src={vitamin.imageUrl || "/placeholder.svg"}
                      alt={vitamin.name}
                      width={36}
                      height={36}
                      className="rounded"
                    />
                    <RText className="text-green-700 font-medium text-base">
                      Vitamin {vitamin.name}
                    </RText>
                    <RText className="font-bold text-green-600 text-base">
                      +{vitamin.points} Points
                    </RText>
                  </Group>
                ))}
              </Box>
            </Card>

            {/* Harmful Substances Card */}
            <Card className="bg-gradient-to-br from-zinc-400 via-gray-600 to-gray-500 border border-gray-300 shadow-md hover:shadow-xl hover:scale-[1.03] rounded-xl transition-all duration-200 p-5">
              <Box className="pb-3">
                <Group className="flex items-center justify-center gap-2">
                  <Box className="p-2 bg-gray-200 rounded-full">
                    <Skull className="w-5 h-5 text-gray-700" />
                  </Box>
                  <RText className="text-lg font-bold text-gray-100">
                    Harmful Substances
                  </RText>
                </Group>
              </Box>
              <Box className="space-y-2">
                {HARMFUL_ITEMS.map((item, index) => (
                  <Group
                    key={index}
                    className="flex justify-evenly items-center py-2 bg-white/70 rounded-md shadow-sm"
                  >
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.name}
                      width={36}
                      height={36}
                      className="rounded"
                    />
                    <RText className="text-orange-700 font-medium text-base">
                      {item.name}
                    </RText>
                    <RText className="font-bold text-red-600 text-base">
                      {item.points} Points
                    </RText>
                  </Group>
                ))}
              </Box>
            </Card>

            {/* Power-ups Card */}
            <Card className="bg-gradient-to-br from-yellow-50 via-amber-100 to-orange-50 border border-yellow-300 shadow-md hover:shadow-xl hover:scale-[1.03] rounded-xl transition-all duration-200 p-5">
              <Box className="pb-3">
                <Group className="flex items-center justify-center gap-2">
                  <Box className="p-2 bg-yellow-200 rounded-full">
                    <Zap className="w-5 h-5 text-yellow-700" />
                  </Box>
                  <RText className="text-lg font-bold text-yellow-800">
                    Power-ups
                  </RText>
                </Group>
              </Box>
              <Box className="space-y-2">
                {MULTIPLIERS.map((item, index) => (
                  <Group
                    key={index}
                    className="flex justify-evenly items-center py-2 bg-white/70 rounded-md shadow-sm"
                  >
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.value.toString()}
                      width={36}
                      height={36}
                      className="rounded"
                    />
                    <RText className="text-orange-700 font-medium text-base">
                      {item.name}
                    </RText>
                    <RText className="text-orange-700 font-medium text-base">
                      X {item.value} Points
                    </RText>
                    <RText className="text-orange-700 font-medium text-base">
                      5s
                    </RText>
                  </Group>
                ))}
              </Box>
            </Card>
          </Block>
        </Section>
      </Area>
    </Yard>
  );
}
