'use client'

import GameHomeLayout from "@/components/EventHome/GameHomeLayout";
import { useGetEventLeaderboardQuery } from "@/process/api/api";
import { useSearchParams } from "next/navigation";

export default function BeautyDropHomePage() {
  const searchParams = useSearchParams();
  const event_id = searchParams.get("event_id");

  const { data: eventData } = useGetEventLeaderboardQuery(String(event_id));

  if (!event_id) {
    return (
      <div className="text-center mt-10 text-red-500">
        Missing event_id query parameter.
      </div>
    );
  }

  return (
    <GameHomeLayout title="BeautyDrop" eventData={eventData?.data}>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-2xl font-semibold text-white drop-shadow mb-4">
          Welcome to the BeautyDrop Game!
        </p>
        <p className="text-lg text-white/80 max-w-xl text-center mb-8">
          Press <span className="font-bold">Play</span> to start the game. Compete for the top spot on the leaderboard and win amazing vouchers!
        </p>
      </div>
    </GameHomeLayout>
  );
}
