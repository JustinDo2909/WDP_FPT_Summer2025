"use client";

import { Area, Block, RText, Section } from "@/lib/by/Div";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/CustomButton";

interface FinalScore {
  correct: number;
  total: number;
}

export default function ResultRender({
  finalScore,
}: {
  finalScore: FinalScore;
}) {
  const router = useRouter();

  const getMessageByScore = (score: number) => {
    if (score >= 18) return "You're a beauty genius!";
    if (score >= 13) return "Well done, beauty pro!";
    if (score >= 8) return "Nice try! Keep glowing!";
    return "Don't worry, keep learning!";
  };

  return (
    <Area className="bg-[#fff0f5] h-screen overflow-hidden px-6 relative">
      {/* Absolute Header */}
      <Section className="absolute top-4 left-4 right-4 flex justify-between z-10">
        <Button
          className="bg-white text-zinc-900 px-5 py-2 rounded-full shadow font-semibold"
          onClick={() => router.push("/event")}
          label="Menu"
        />
      </Section>

      <Section className="flex flex-col  gap-8 mt-20 mx-24">
        <Block className="flex-col items-center justify-center w-full">
          {/* Congratulation */}
          <Section className="text-center mb-6">
            <RText className="text-3xl font-bold text-red-500">
              Congratulation!
            </RText>
            <RText className="mt-3 text-2xl font-medium text-slate-700">
              You got{" "}
              <RText className="text-red-500 font-bold">
                {finalScore.correct}/{finalScore.total}
              </RText>{" "}
              correct answers!
            </RText>
          </Section>
        </Block>

        <Block className="flex flex-col items-center justify-center text-center px-4">
          {/* Example illustration (can be replaced with your own image) */}
          <Image
            src="https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWPZHJqpOrulwk1UO3YLnpZhyJsMeibzfd0mVt"
            width={300}
            height={300}
            alt="Congrats"
            className="mb-4"
          />
          <RText className="text-2xl font-bold text-orange-500">
            {getMessageByScore(finalScore.correct)}
          </RText>
        </Block>
      </Section>
    </Area>
  );
}
