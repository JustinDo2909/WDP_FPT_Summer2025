"use client";

import { useState } from "react"; // nhập đúng path bạn đang dùng
import MenuQuiz from "./menu_quiz";
import GamePlay from "./game_play";
import {
  useGetQuestionsQuery,
  useGetRewardHooksQuery,
} from "@/process/api/apiEvent";

export default function QuizGame() {
  const [hasStarted, setHasStarted] = useState(false);

  const { data: fetchQuestions } = useGetQuestionsQuery();
  const { data: fetchTierRewards } = useGetRewardHooksQuery();
  if (!hasStarted) {
    return <MenuQuiz onPlay={() => setHasStarted(true)} />;
  }

  return (
    <GamePlay
      questions={fetchQuestions?.questions ?? []}
      rewardTiers={fetchTierRewards?.eventRewards ?? []}
    />
  );
}
