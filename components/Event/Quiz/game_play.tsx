"use client";

import { useState, useEffect } from "react";
import QuizRender from "./quiz_render";
import ResultRender from "./result";
import { Block } from "@/lib/by/Div";

interface QuizAnswer {
  questionId: string;
  selectedOption: number;
}

interface GamePlayProps {
  questions: QuizQuestion[];
}

export default function GamePlay({ questions }: GamePlayProps) {
  const [quizState, setQuizState] = useState<"playing" | "finished">("playing");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [finalScore, setFinalScore] = useState({ correct: 0, total: 0 });

  // --- Selection logic ---
  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const qid = questions[currentQuestion].id;
    const updated = [
      ...answers.filter((a) => a.questionId !== qid),
      { questionId: qid, selectedOption: optionIndex },
    ];
    setAnswers(updated);
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      restoreSelection(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      restoreSelection(currentQuestion + 1);
    }
  };

  const restoreSelection = (qIndex: number) => {
    const found = answers.find((a) => a.questionId === questions[qIndex].id);
    setSelectedOption(found?.selectedOption ?? null);
  };

  const calculateAndShowResults = async () => {
    let correct = 0;
    answers.forEach((a) => {
      const q = questions.find((q) => q.id === a.questionId);
      if (q?.questionOptions[a.selectedOption]?.is_correct) correct++;
    });
    setFinalScore({ correct, total: questions.length });

    setQuizState("finished");
  };

  // Update selected option on question switch
  useEffect(() => {
    const current = questions[currentQuestion];
    const selected = answers.find((a) => a.questionId === current.id);
    setSelectedOption(selected?.selectedOption ?? null);
  }, [currentQuestion, answers, questions]);

  if (!questions || questions.length === 0) {
    return (
      <Block className="flex flex-col items-center justify-center h-screen bg-[#fff0f5] text-red-500">
        No questions available!
      </Block>
    );
  }

  return quizState === "playing" ? (
    <QuizRender
      questions={questions}
      currentQuestion={currentQuestion}
      selectedOption={selectedOption}
      onOptionSelect={handleOptionSelect}
      onPrev={handlePrev}
      onNext={handleNext}
      onSubmit={calculateAndShowResults}
      answers={answers}
    />
  ) : (
    <ResultRender finalScore={finalScore} />
  );
}
