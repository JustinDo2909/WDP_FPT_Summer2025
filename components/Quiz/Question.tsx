"use client";

import { Anchor, Block, Section, Wrap } from "@/lib/by/Div";
import { useEffect, useRef, useState } from "react";
import ShapeCard from "./ShapeCard";

interface QuestionProps {
  question: {
    question: string;
    options: string[];
    correctAnswer: string;
    timeLimit: number;
  };
  onAnswer: (answer: string) => void;
  onTimeout: () => void;
}

export default function Question({ question, onAnswer, onTimeout }: QuestionProps) {
  const [timeLeft, setTimeLeft] = useState(question.timeLimit);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeLeft(question.timeLimit);
  }, [question]);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current!);
          setTimeout(() => {
            onTimeout();
          }, 0);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [question, onTimeout]);

  return (
    <Section className="w-full h-full bg-white justify-center items-center flex-col flex relative gap-5">
      <h2 className="text-2xl font-bold mb-6 text-center px-4">{question.question}</h2>
      <Anchor className="grid grid-cols-2 gap-4 w-full px-4 justify-center">
        {question.options.map((option, index) => {
          const shapeMap = ["triangle", "diamond", "circle", "square"];
          const colorMap = [
            "bg-red-500",
            "bg-blue-500",
            "bg-yellow-500",
            "bg-green-500",
          ];

          return (
            <button key={index} onClick={() => onAnswer(option)}>    
              <ShapeCard
                shape={shapeMap[index % shapeMap.length]} 
                backgroundColor={colorMap[index % colorMap.length]} 
                option={option}
              />
            </button>
          );
        })}
      </Anchor>

      <Anchor className="mt-6 text-center w-full px-4">
        <p className="text-sm font-medium">Time left: {timeLeft} seconds</p>
        <Block className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <Wrap
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${(timeLeft / question.timeLimit) * 100}%` }}
          ></Wrap>
        </Block>
      </Anchor>
    </Section>
  );
}