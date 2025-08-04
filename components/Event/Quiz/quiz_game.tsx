"use client";

import { useState } from "react"; // nhập đúng path bạn đang dùng
import MenuQuiz from "./menu_quiz";
import GamePlay from "./game_play";
import { useGetQuestionsQuery } from "@/process/api/apiEvent";

export default function QuizGame() {
  const [hasStarted, setHasStarted] = useState(false);

  const handlePlay = async () => {
    setHasStarted(true);
  };

  const { data: fetchQuestions } = useGetQuestionsQuery({ eventId: "1" });

  return (
    <>
      {!hasStarted ? (
        <MenuQuiz onPlay={handlePlay} />
      ) : (
        <GamePlay questions={fetchQuestions?.questions ?? []} />
      )}
    </>
  );
}
