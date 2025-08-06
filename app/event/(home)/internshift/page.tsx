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
