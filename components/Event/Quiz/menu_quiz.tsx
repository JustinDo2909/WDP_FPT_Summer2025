"use client";
import Button from "@/components/CustomButton";
import { Area, Block, RText, Section } from "@/lib/by/Div";
import { useRouter } from "next/navigation";

export default function MenuQuiz({ onPlay }: { onPlay: () => void }) {
  const router = useRouter();

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
            className="bg-white text-red-500 border-2 border-red-500 py-3 rounded-full text-base font-semibold hover:bg-red-50 transition-colors"
            onClick={() => router.push("/event")}
            label="Exit"
          />
        </Block>
      </Section>
    </Area>
  );
}
