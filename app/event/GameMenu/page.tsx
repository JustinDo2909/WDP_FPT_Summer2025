"use client";

import CosmeticCatchGame from "@/components/Event/BeautyDrop/cosmetic-catch-game";
import GameHomeLayout from "@/components/EventHome/GameHomeLayout";
import { Block, Container, RText } from "@/lib/by/Div";
import {
  useGetEventByIdQuery,
  useGetEventLeaderboardQuery,
} from "@/process/api/api";
import { useSearchParams } from "next/navigation";

export default function BeautyDropHomePage() {
  const searchParams = useSearchParams();
  const event_id = searchParams.get("event_id");

  const { data: eventData } = useGetEventLeaderboardQuery(String(event_id));
  const { data: event } = useGetEventByIdQuery(String(event_id));

  if (!event_id) {
    return (
      <Block className="text-center mt-10 text-red-500">
        Missing event_id query parameter.
      </Block>
    );
  }

  return (
    <GameHomeLayout title="BeautyDrop" eventData={eventData?.data}>
      {event?.type === "DROP" ? (
        <Container className="">
          <CosmeticCatchGame />
        </Container>
      ) : (
        <Block>
          <RText>Event not found</RText>
        </Block>
      )}
    </GameHomeLayout>
  );
}
