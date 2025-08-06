"use client";

import { useState } from "react"; // nhập đúng path bạn đang dùng
import MenuQuiz from "./menu_quiz";
import GamePlay from "./game_play";
import {
  useGetQuestionsQuery,
  useGetRewardHooksQuery,
  usePlayEventMutation,
} from "@/process/api/apiEvent";

export default function QuizGame() {
  const [hasStarted, setHasStarted] = useState(false);
  const [playError, setPlayError] = useState<string | null>(null);
  const [playEvent, { isLoading: isPlayingEvent }] = usePlayEventMutation();

  const handlePlay = async () => {
    await playEvent()
      .unwrap()
      .then(() => setHasStarted(true))
      .catch(() => {
        setPlayError(
          "You have already played today! Please come back tomorrow!",
        );
      });
  };

  const { data: fetchQuestions } = useGetQuestionsQuery({ eventId: "1" });
  const { data: fetchTierRewards } = useGetRewardHooksQuery({ eventId: "1" });

  return (
    <>
      {!hasStarted ? (
        <MenuQuiz
          onPlay={handlePlay}
          isPlayingEvent={isPlayingEvent}
          playError={playError}
        />
      ) : (
        <GamePlay
          questions={fetchQuestions?.questions ?? []}
          rewardTiers={fetchTierRewards?.eventRewards ?? []}
        />
      )}
    </>
  );
}
