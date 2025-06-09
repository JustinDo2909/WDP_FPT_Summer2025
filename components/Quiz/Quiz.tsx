"use client";

import { Block, RText } from "@/lib/by/Div";
import { useState, useRef } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Threejs_banner from "@/components/HomePage/Banner/Threejs_banner";
import {
  useGetEventRewardsQuery,
  useGetRandomQuestionQuery,
  usePostAnswerMutation,
} from "@/process/api/api";
import { IQuestionOptions, IQuestions, IReward } from "@/types/quiz";
import Question from "./Question";

export default function Quiz() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [audioStarted, setAudioStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [apiResult, setApiResult] = useState<{
    score?: number;
    reward?: number;
    type?: string;
  } | null>(null);
  const { width, height } = useWindowSize();
  const {
    data: rawQuestions,
    isLoading,
    isError,
  } = useGetRandomQuestionQuery();
  const { data: reward } = useGetEventRewardsQuery();
  const [submit, { isLoading: isSubmitting, error: submitError }] =
    usePostAnswerMutation();
  const backgroundAudioRef = useRef<HTMLAudioElement>(null);
  const startAudioRef = useRef<HTMLAudioElement>(null);


  const questions = Array.isArray(rawQuestions)
    ? rawQuestions.map((q: IQuestions) => ({
        question: q.content || "No question available",
        options: Array.isArray(q.questionOptions)
          ? q.questionOptions.map((opt: IQuestionOptions) => opt.content || "No option")
          : ["Option 1", "Option 2", "Option 3", "Option 4"],
        correctAnswer:
          q.questionOptions?.find((opt: IQuestionOptions) => opt.is_correct)?.content || "",
        timeLimit: 15,
      }))
    : rawQuestions   

  const sortedRewards =
    reward && Array.isArray(reward)
      ? [...reward].sort((a, b) => b?.min_correct  - a?.min_correct)
      : [];

  const startQuiz = () => {
    if (backgroundAudioRef.current && !audioStarted) {
      backgroundAudioRef.current.volume = 0.5;
      backgroundAudioRef.current.muted = isMuted;
      backgroundAudioRef.current
        .play()
        .then(() => {
          setAudioStarted(true);
        })
       
    }
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setAnsweredQuestions(0);
    setApiResult(null);

    if (startAudioRef.current) {
      startAudioRef.current.volume = 0.8;
      startAudioRef.current.play().catch((err) => {
        console.error("Start sound play error:", err);
      });
    }
  };

  const toggleMute = () => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleAnswer = async (answer: string) => {
    setAnsweredQuestions((prev) => prev + 1);
    if (answer === questions?.[currentQuestionIndex]?.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
        setAudioStarted(false);
      }
      // Submit score to API
      try {
        const result = await submit({ correct_answers: score }).unwrap();
        setApiResult({ score, reward: result.discount_value });
      } catch (err) {
        console.error("Submit error:", err);
        setApiResult({ score });
      }
    }
  };

  const handleTimeout = async () => {
    setAnsweredQuestions((prev) => prev + 1);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
        setAudioStarted(false);
      }
      // Submit score to API
      try {
        const result = await submit({ correct_answers: score }).unwrap();
        setApiResult({
          score,
          reward: Number(result.discount_value),
          type: result.type,
        });
      } catch (err) {
        console.error("Submit error:", err);
        setApiResult({ score });
      }
    }
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <Block className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-3xl font-bold mb-6 text-white">Loading...</h1>
      </Block>
    );
  }

  if (isError || !questions || questions.length === 0) {
    return (
      <Block className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Error loading questions
        </h1>
      </Block>
    );
  }

  if (!quizStarted) {
    return (
      <>
        <Threejs_banner />
        <Block className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-3xl font-bold mb-6 text-white">Quiz App</h1>
          <button
            onClick={startQuiz}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
          >
            Start Quiz
          </button>
        </Block>
        <audio ref={backgroundAudioRef} src="/audio/nhacnen.mp3" loop />
        <audio ref={startAudioRef} src="/audio/nhacnen.mp3" muted />
      </>
    );
  }

  if (quizCompleted) {
    const isPerfectScore = score === questions.length;

    return (
      <>
        <Block className="text-center">
          <h1 className="text-3xl font-bold mb-6">Quiz App</h1>
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          {isPerfectScore && <Confetti width={width} height={height} />}
          {apiResult ? (
            <>
              <p
                className={`text-xl ${isPerfectScore ? "text-green-600 font-bold" : ""}`}
              >
                Your score: {apiResult.score} out of {questions.length}
              </p>
              {apiResult.reward ? (
                <p className="text-lg mt-2 text-green-600 font-semibold">
                  Congratulations! You earned a reward of {apiResult.reward}{" "}
                  {apiResult.type}
                </p>
              ) : (
                <p className="text-lg mt-2 text-red-600">
                  No reward earned. Try again to score higher!
                </p>
              )}
            </>
          ) : isSubmitting ? (
            <p className="text-xl">Submitting...</p>
          ) : (
            <p className="text-xl text-red-600">Error submitting score.</p>
          )}
          {submitError && (
            <p className="text-sm text-red-600 mt-2">
              Submission error: {JSON.stringify(submitError)}
            </p>
          )}
          <button
            onClick={startQuiz}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
          >
            Restart Quiz
          </button>
        </Block>
        <audio ref={backgroundAudioRef} src="/audio/nhacnen.mp3" loop />
        <audio ref={startAudioRef} src="/audio/nhacnen.mp3" muted />
      </>
    );
  }

  return (
    <>
      <Block className="w-full mx-auto flex flex-col md:flex-row justify-center items-start gap-6 p-4 min-h-screen">
        {/* Rewards Table */}
        {sortedRewards.length > 0 && (
          <Block className="w-full md:w-1/4 bg-gradient-to-b from-blue-50 to-white shadow-xl rounded-xl p-6 h-[calc(100vh-8rem)] overflow-y-auto animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-center text-blue-700">
              Rewards
            </h3>
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600 text-white sticky top-0">
                  <th className="py-3 px-4 text-left">Correct Answers</th>
                  <th className="py-3 px-4 text-left">Reward</th>
                </tr>
              </thead>
              <tbody>
                {sortedRewards.map((r: IReward) => (
                  <tr
                    key={r.id}
                    className="border-b hover:bg-blue-100 hover:scale-[1.02] transform transition-all duration-200"
                  >
                    <td className="py-3 px-4">{r.min_correct}</td>
                    <td className="py-3 px-4">
                      {r.type === "PERCENT"
                        ? `${r.discount_value}% off`
                        : `${r.discount_value} off`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Block>
        )}
        {/* Question Section */}
        <Block className="w-full md:w-3/4 text-center bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6">Quiz App</h1>
          <Question
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            onTimeout={handleTimeout}
          />
          <RText className="mt-4 text-center">
            Question {currentQuestionIndex + 1} of {questions.length}
          </RText>
          <Block className="mt-4 flex gap-4 justify-center">
            <button
              onClick={() => backgroundAudioRef.current?.play()}
              className="bg-gray-500 text-white px-4 py-1 rounded-lg text-sm font-semibold hover:bg-gray-600 transition"
            >
              Play Music
            </button>
            <button
              onClick={toggleMute}
              className="bg-gray-500 text-white px-4 py-1 rounded-lg text-sm font-semibold hover:bg-gray-600 transition"
            >
              {isMuted ? "Unmute" : "Mute"}
            </button>
          </Block>
        </Block>
      </Block>
      <audio ref={backgroundAudioRef} src="/audio/nhacnen.mp3" loop />
      <audio ref={startAudioRef} src="/audio/nhacnen.mp3" muted />
    </>
  );
}
