"use client";

import CosmeticCatchGame from "@/components/Event/BeautyDrop/cosmetic-catch-game";
import Defender from "@/components/Event/Defender/gameplay";
import GameHomeLayout from "@/components/EventHome/GameHomeLayout";
import { Block, Container, RText } from "@/lib/by/Div";
import {
  useGetEventLeaderboardQuery,
  useGetNewEventByIdQuery,
} from "@/process/api/api";
import { useSearchParams } from "next/navigation";

export default function BeautyDropHomePage() {
  const searchParams = useSearchParams();
  const event_id = searchParams.get("event_id");

  const { data: eventData } = useGetEventLeaderboardQuery(String(event_id));
  const { data: event } = useGetNewEventByIdQuery(String(event_id));

  if (!event_id) {
    return (
      <Block className="text-center mt-10 text-red-500">
        Missing event_id query parameter.
      </Block>
    );
  }


  return (
    <GameHomeLayout event={event} title={event?.title} eventData={eventData?.data}>
      <Container className="w-full ">
        {event?.type === "DROP" ? (
          <CosmeticCatchGame />
        ) : event?.type === "DEFENDER" ? (
          <Defender />
        ) : (
          <Block>
            <RText>Event not found</RText>
          </Block>
        )}
      </Container>
    </GameHomeLayout>
  );
}
