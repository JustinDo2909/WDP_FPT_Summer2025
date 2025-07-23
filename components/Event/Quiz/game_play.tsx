"use client";

import { useState, useEffect, useMemo } from "react";
import QuizRender from "./quiz_render";
import ResultRender from "./result";
import {
  useCalculateRewardMutation,
  usePlayEventMutation,
} from "@/process/api/apiEvent";
import { Area, Block, Group, RText, Section } from "@/lib/by/Div";
import Button from "@/components/CustomButton";
import { Heart } from "lucide-react";

interface QuizAnswer {
  questionId: string;
  selectedOption: number;
}

interface GamePlayProps {
  questions: QuizQuestion[];
  rewardTiers: EventReward[];
}

export default function GamePlay({ questions, rewardTiers }: GamePlayProps) {
  const [quizState, setQuizState] = useState<
    "playing" | "finished" | "restricted"
  >("playing");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [finalScore, setFinalScore] = useState({ correct: 0, total: 0 });
  const [reward, setReward] = useState<EventReward | null>(null);
  const [playError, setPlayError] = useState<string | null>(null);

  const [calculateReward, { isLoading: isCalculatingReward }] =
    useCalculateRewardMutation();
  const [playEvent, { isLoading: isPlayingEvent }] = usePlayEventMutation();

  useEffect(() => {
    const startGame = async () => {
      try {
        const result = await playEvent().unwrap();
        if (result.success === true) {
          setQuizState("playing");
        }
      } catch {
        setPlayError(
          "You have already played today! Please come back tomorrow!"
        );
        setQuizState("restricted");
      }
    };

    startGame();
  }, [playEvent]);

  const mappedRewardTiers = useMemo(() => {
    return rewardTiers.map((r) => ({
      correct: r.min_correct ?? 0,
      reward:
        r.type === "PERCENT"
          ? `${r.discount_value}% voucher`
          : `${r.discount_value} VND discount`,
    }));
  }, [rewardTiers]);

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
    try {
      const result = await calculateReward({
        correct_answers: correct,
        eventId: 1,
      }).unwrap();
      setReward(result);
      setQuizState("finished");
    } catch {
      setReward(null);
      setQuizState("finished");
    }
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

  if (isPlayingEvent) {
    return (
      <Section className="flex flex-col items-center justify-center h-screen bg-[#fff0f5] text-red-500">
        <svg
          className="animate-spin h-8 w-8 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0l4 4-4 4V4a4 4 0 00-4 4H0z"
          ></path>
        </svg>
        <p>Checking play status...</p>
      </Section>
    );
  }

  if (quizState === "restricted") {
    return (
      <Area className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#fff0f5] to-[#ffe4e1] text-red-500">
        <Section className="text-center mb-8">
          <RText className="text-4xl font-bold text-red-500">Glow & Know</RText>
          <RText className="text-lg text-orange-500 font-semibold mt-2">
            Your Beauty Brain Teaser!
          </RText>
        </Section>
        <Block className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
          <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <RText className="text-2xl font-bold text-red-500">
            Cannot Play!
          </RText>
          <RText className="text-base text-slate-600 mt-2">{playError}</RText>
          <RText className="text-sm text-slate-500 mt-4">
            Thank you for your enthusiasm! We can not wait to see you back
            tomorrow!
          </RText>
          <Group className="mt-6">
            <Button
              className="bg-red-500 text-white py-3 px-6 rounded-full text-base font-semibold hover:bg-red-600 transition-colors"
              onClick={() => (window.location.href = "/event")}
              label="Back to Menu"
            />
          </Group>
        </Block>
      </Area>
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
    <ResultRender
      finalScore={finalScore}
      rewardTiers={mappedRewardTiers}
      reward={reward}
      isCalculatingReward={isCalculatingReward}
    />
  );
}
