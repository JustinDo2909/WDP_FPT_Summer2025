"use client";

import { Block, RText } from "@/lib/by/Div";
import { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Question from "./Question";
import { questions } from "@/constants/quiz";


export default function Quiz() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const { width, height } = useWindowSize();

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setAnsweredQuestions(0);
  };

  const handleAnswer = (answer: string) => {
    setAnsweredQuestions(answeredQuestions + 1);

    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleTimeout = () => {
    setAnsweredQuestions(answeredQuestions + 1);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  if (!quizStarted) {
    return (
      <Block className="text-center">
        <h1 className="text-3xl font-bold mb-6">Quiz App</h1>
        <button
          onClick={startQuiz}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
        >
          Start Quiz
        </button>
      </Block>
    );
  }

  if (quizCompleted) {
    const isPerfectScore = score === questions.length;

    return (
      <Block className="text-center">
        <h1 className="text-3xl font-bold mb-6">Quiz App</h1>
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        {isPerfectScore && <Confetti width={width} height={height} />}
        <p
          className={`text-xl ${isPerfectScore ? "text-green-600 font-bold" : ""}`}
        >
          Your score: {score} out of {questions.length}
        </p>
        <button
          onClick={startQuiz}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
        >
          Restart Quiz
        </button>
      </Block>
    );
  }

  return (
    <Block className="w-full  mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Quiz App</h1>
      <Question
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        onTimeout={handleTimeout}
      />
      <RText className="mt-4 text-center">
        Question {currentQuestionIndex + 1} of {questions.length}
      </RText>
    </Block>
  );
}
