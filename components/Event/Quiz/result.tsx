"use client";

import { Area, Block, RText, Section } from "@/lib/by/Div";
import { useRouter } from "next/navigation";
import { TicketPercent } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";

interface RewardTier {
  correct: number;
  reward: string;
}

interface FinalScore {
  correct: number;
  total: number;
}

export default function ResultRender({
  finalScore,
  rewardTiers,
}: {
  finalScore: FinalScore;
  rewardTiers: RewardTier[];
}) {
  const router = useRouter();

  const getEarnedReward = (correctCount: number) => {
    const sorted = [...rewardTiers].sort((a, b) => b.correct - a.correct);
    return sorted.find((tier) => correctCount >= tier.correct)?.reward ?? null;
  };

  const earnedReward = getEarnedReward(finalScore.correct);

  const rewardHookItems = Array.from(
    { length: finalScore.total },
    (_, i) => finalScore.total - i
  );

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
        <button
          className="bg-white text-slate-700 px-5 py-2 rounded-full shadow font-semibold"
          onClick={() => router.push("/event")}
        >
          Menu
        </button>
        <button className="bg-white text-slate-700 px-5 py-2 rounded-full shadow font-semibold">
          Redeem
        </button>
      </Section>

      {/* Main Layout */}
      <Section className="flex flex-col md:flex-row gap-8 mt-20 mx-24">
        {/* Left: Image or message */}
        <Block className="flex flex-col items-end justify-center text-center px-4">
          {/* Example illustration (can be replaced with your own image) */}
          <Image
            src="https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWPZHJqpOrulwk1UO3YLnpZhyJsMeibzfd0mVt"
            width={400}
            height={400}
            alt="Congrats"
            className="mb-4"
          />
          <RText className="text-2xl font-bold text-orange-500">
            {getMessageByScore(finalScore.correct)}
          </RText>
        </Block>

        {/* Right: Result info */}
        <Block className="flex-1 flex-col items-end justify-center w-full">
          {/* Congratulation */}
          <Section className="text-center mb-6">
            <RText className="text-3xl font-bold text-red-500">
              Congratulation!
            </RText>
            <RText className="mt-3 text-lg font-medium text-slate-700">
              You got{" "}
              <span className="text-red-500 font-bold">
                {finalScore.correct}/{finalScore.total}
              </span>{" "}
              correct answers!
            </RText>
          </Section>

          {/* Reward Summary */}
          <Section className="bg-white rounded-xl p-3 shadow flex items-center gap-4 max-w-md mx-auto">
            <TicketPercent className="text-red-500 w-6 h-6" />
            <RText className="text-base font-semibold text-red-500">
              {earnedReward || "No reward achieved"}
            </RText>
          </Section>

          {/* Decorative text */}
          <Section className="my-5 text-center opacity-60">
            <RText className="text-3xl font-cursive text-orange-400">
              Congratulations!
            </RText>
          </Section>

          {/* Reward Hooks */}
          <Section className="bg-white rounded-xl p-5 shadow max-w-md mx-auto">
            <RText className="text-lg font-bold text-slate-800 mb-4">
              Reward Hooks
            </RText>
            <Block className="space-y-3 h-[200px] overflow-y-auto pr-2">
              {rewardHookItems.map((num) => {
                const tier = rewardTiers.find((t) => t.correct === num);
                return (
                  <Block
                    key={num}
                    className={clsx(
                      "flex justify-between items-center px-4 py-3 rounded-lg border",
                      finalScore.correct === num
                        ? "bg-red-50 border-red-400"
                        : "border-slate-200"
                    )}
                  >
                    <RText className="text-sm font-medium text-slate-700">
                      {num}/{finalScore.total} correct
                    </RText>
                    {tier && (
                      <Block className="flex items-center gap-2 text-red-500 font-semibold text-sm">
                        <TicketPercent className="w-4 h-4" />
                        <span>{tier.reward}</span>
                      </Block>
                    )}
                  </Block>
                );
              })}
            </Block>
          </Section>
        </Block>
      </Section>
    </Area>
  );
}
