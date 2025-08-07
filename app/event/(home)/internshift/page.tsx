"use client";

import GameHomeLayout from "@/components/EventHome/GameHomeLayout";
import { useGetNewEventByIdQuery } from "@/process/api/api";
import { useGetEventLeaderboardQuery } from "@/process/api/apiEvent";
import { useSearchParams } from "next/navigation";

export default function InternshiftGamePage() {
  const searchParams = useSearchParams();
  const event_id = searchParams.get("event_id");

  const { data: eventData } = useGetEventLeaderboardQuery(String(event_id));
  const { data: event } = useGetNewEventByIdQuery(String(event_id));

  return (
    <GameHomeLayout
      extraRule="Use your cosmetic and skincare knowledge to help the intern statisfy the customer! Choose the best routine and products for their skin condition to earn stars. Earn up to two stars for extra bonuses and the chance to play a minigame. Read the tooltips to perform even better"
      event={event}
      title=""
      backgroundImage="https://i.ibb.co/TqBxrqYw/intershift-cover.png"
      eventData={eventData?.data}
    >
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        {/* You can add more game instructions, status, or a preview here if needed */}
      </div>
    </GameHomeLayout>
  );
}
