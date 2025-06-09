"use client";

import { useState, useEffect } from "react";
import { Area, RText, Yard, Core, Container } from "@/lib/by/Div";
import { getOptionColor } from "@/components/admin/Quiz/seg/utils";
import type { QuizQuestion } from "@/constants/manage-quizzes";

interface QuestionPreviewProps {
  question: QuizQuestion;
  onClose: () => void;
}

export function QuestionPreview({ question, onClose }: QuestionPreviewProps) {
  const [timeLeft, setTimeLeft] = useState(question.timeLimit);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // Simulate countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !showAnswer) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showAnswer) {
      setShowAnswer(true);
    }
  }, [timeLeft, showAnswer]);

  const handleSelectOption = (optionId: string) => {
    if (!showAnswer) {
      setSelectedOption(optionId);
      setShowAnswer(true);
    }
  };

  const resetPreview = () => {
    setTimeLeft(question.timeLimit);
    setSelectedOption(null);
    setShowAnswer(false);
  };

  return (
    <Core className="bg-gray-100 min-h-[500px] rounded-lg overflow-hidden flex flex-col">
      {/* Header */}
      <Container className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
        <RText className="text-lg font-semibold">Question Preview</RText>
        <Area className="flex gap-2">
          <button
            onClick={resetPreview}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            Restart
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </Area>
      </Container>

      {/* Question */}
      <Container className="p-4 flex-1 flex flex-col">
        {/* Timer and Points */}
        <Area className="flex justify-between items-center mb-4">
          <Yard className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold">
            {timeLeft}
          </Yard>
          <Yard className="text-right">
            <RText className="text-sm text-gray-500">Points</RText>
            <RText className="text-xl font-bold">{question.points}</RText>
          </Yard>
        </Area>

        {/* Question Content */}
        <RText className="text-xl font-medium text-center mb-4">
          {question.content}
        </RText>

        {/* Question Image */}
        {question.image && (
          <Yard className="mb-6 flex justify-center">
            <img
              src={question.image || "/placeholder.svg"}
              alt="Question"
              className="max-h-64 object-contain rounded-lg"
              onError={(e) => {
                e.currentTarget.src =
                  "/placeholder.svg?height=200&width=400&text=Image+Error";
              }}
            />
          </Yard>
        )}

        {/* Answer Options */}
        <Area className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === option.id;
            const isCorrect = option.isCorrect;
            const showCorrect = showAnswer && isCorrect;
            const showWrong = showAnswer && isSelected && !isCorrect;

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                disabled={showAnswer}
                className={`p-4 rounded-lg text-white font-medium text-lg transition-all duration-300 ${
                  showCorrect
                    ? "bg-green-500 ring-4 ring-green-300"
                    : showWrong
                      ? "bg-red-500 ring-4 ring-red-300"
                      : isSelected
                        ? `${getOptionColor(option.color || "red")} ring-4 ring-white`
                        : getOptionColor(option.color || "red")
                } ${!showAnswer ? "hover:scale-105 hover:shadow-lg" : ""} ${
                  showAnswer ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <Area className="flex items-center gap-3">
                  <Yard
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      showCorrect || showWrong
                        ? "bg-white text-gray-800"
                        : "bg-white bg-opacity-20"
                    }`}
                  >
                    {index + 1}
                  </Yard>
                  <RText className="flex-1 text-left">{option.text}</RText>
                </Area>
              </button>
            );
          })}
        </Area>

        {/* Result */}
        {showAnswer && (
          <Container className="mt-4 p-4 bg-white rounded-lg border">
            {selectedOption ? (
              <Area className="text-center">
                {question.options.find((opt) => opt.id === selectedOption)
                  ?.isCorrect ? (
                  <Area>
                    <RText className="text-2xl font-bold text-green-600 mb-2">
                      Correct! 🎉
                    </RText>
                    <RText className="text-gray-600">
                      You earned {question.points} points!
                    </RText>
                  </Area>
                ) : (
                  <Area>
                    <RText className="text-2xl font-bold text-red-600 mb-2">
                      Wrong Answer 😞
                    </RText>
                    <RText className="text-gray-600">
                      The correct answer was:{" "}
                      {question.options.find((opt) => opt.isCorrect)?.text}
                    </RText>
                  </Area>
                )}
              </Area>
            ) : (
              <Area className="text-center">
                <RText className="text-2xl font-bold text-orange-600 mb-2">
                  Time's Up! ⏰
                </RText>
                <RText className="text-gray-600">
                  The correct answer was:{" "}
                  {question.options.find((opt) => opt.isCorrect)?.text}
                </RText>
              </Area>
            )}
          </Container>
        )}

        {/* Question Info */}
        <Container className="mt-4 p-3 bg-white rounded-lg border">
          <Area className="flex flex-wrap gap-2 items-center">
            <RText className="text-sm text-gray-500">Tags:</RText>
            {question.tags.map((tag) => (
              <Yard
                key={tag}
                className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
              >
                {tag}
              </Yard>
            ))}
          </Area>
        </Container>
      </Container>
    </Core>
  );
}
