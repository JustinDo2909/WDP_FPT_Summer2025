"use client";
import Button from "@/components/CustomButton";
import { Area, Block, Group, RText, Section } from "@/lib/by/Div";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

interface MenuQuizProps {
  onPlay: () => void;
  isPlayingEvent: boolean;
  playError: string | null;
}

export default function MenuQuiz({
  onPlay,
  isPlayingEvent,
  playError,
}: MenuQuizProps) {
  const router = useRouter();

  if (isPlayingEvent) {
    return (
      <Area className="flex flex-col items-center justify-center h-screen bg-[#fff0f5] text-red-500">
        <svg
          className="animate-spin h-8 w-8 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0l4 4-4 4V4a4 4 0 00-4 4H0z"
          ></path>
        </svg>
        <p>Checking play status...</p>
      </Area>
    );
  }

  if (playError) {
    return (
      <Area className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#fff0f5] to-[#ffe4e1] text-red-500">
        <Section className="text-center mb-8">
          <RText className="text-4xl font-bold text-red-500">Glow & Know</RText>
          <RText className="text-lg text-orange-500 font-semibold mt-2">
            Your Beauty Brain Teaser!
          </RText>
        </Section>
        <Block className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
          <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <RText className="text-2xl font-bold text-red-500">
            Cannot Play!
          </RText>
          <RText className="text-base text-slate-600 mt-2">{playError}</RText>
          <RText className="text-sm text-slate-500 mt-4">
            Thank you for your enthusiasm! We can not wait to see you back
            tomorrow!
          </RText>
          <Group className="mt-6">
            <Button
              className="bg-red-500 text-white py-3 px-6 rounded-full text-base font-semibold hover:bg-red-600 transition-colors"
              onClick={() => router.push("/event")}
              label="Back to Menu"
            />
          </Group>
        </Block>
      </Area>
    );
  }

  return (
    <Area className="bg-[#fff0f5] min-h-screen py-10 flex flex-col justify-center items-center">
      <Section className="text-center mb-10">
        <RText className="text-4xl font-bold text-red-500">Glow & Know</RText>
        <RText className="text-lg text-orange-500 font-semibold mt-2">
          Your Beauty Brain Teaser!
        </RText>
        <RText className="text-slate-600 max-w-xl mx-auto mt-4 leading-relaxed">
          Glow & Know is the ultimate beauty quiz game for all cosmetics
          enthusiasts. Challenge your knowledge with hundreds of questions
          covering skincare, makeup, brands, and beauty history. Play, learn,
          and glow as a true beauty expert!
        </RText>
      </Section>

      <Section className="space-y-4 px-10 max-w-lg mx-auto">
        <Block className="w-52 flex flex-col gap-4 mx-auto">
          <Button
            onClick={onPlay}
            className="bg-red-500 text-white py-4 rounded-full text-lg font-bold shadow-md hover:bg-[#ffaaaa] hover:scale-105 transition-transform"
            label="Play Now!"
          />

          <Button
            className="bg-black border-2 border-red-500 py-3 rounded-full text-base font-semibold hover:bg-red-50 transition-colors"
            onClick={() => router.push("/event")}
            label="Exit"
          />
        </Block>
      </Section>
    </Area>
  );
}
