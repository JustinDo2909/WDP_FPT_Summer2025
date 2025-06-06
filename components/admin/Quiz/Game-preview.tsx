"use client";

import { useState } from "react";
import { Play, Clock, Users, Calendar, Trophy, Tag } from "lucide-react";
import { Area, RText, Yard, Core, Container } from "@/lib/by/Div";
import type { QuizGame } from "@/constants/manage-quizzes";
import {
  formatDateTime,
  getStatusColor,
} from "@/components/admin/Quiz/seg/utils";

interface GamePreviewProps {
  game: QuizGame;
  onClose: () => void;
  onPlay?: () => void;
}

export function GamePreview({ game, onClose, onPlay }: GamePreviewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = game.questions[currentQuestionIndex];

  const nextQuestion = () => {
    if (currentQuestionIndex < game.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <Core className="bg-white rounded-lg overflow-hidden">
      {/* Header */}
      <Container className="p-6 border-b border-gray-200">
        <Area className="flex justify-between items-start">
          <Yard className="flex-1">
            <Area className="flex items-center gap-2 mb-2">
              <RText className="text-2xl font-bold text-gray-900">
                {game.title}
              </RText>
              <Yard
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(game.status)}`}
              >
                {game.status}
              </Yard>
            </Area>
            <RText className="text-gray-600 mb-4">{game.description}</RText>

            {/* Game Info */}
            <Area className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Yard className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <RText className="text-sm text-gray-600">
                  {game.duration} minutes
                </RText>
              </Yard>
              <Yard className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <RText className="text-sm text-gray-600 capitalize">
                  {game.mode}
                </RText>
              </Yard>
              <Yard className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-gray-500" />
                <RText className="text-sm text-gray-600">
                  {game.totalPoints} points
                </RText>
              </Yard>
              <Yard className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-gray-500" />
                <RText className="text-sm text-gray-600 capitalize">
                  {game.type}
                </RText>
              </Yard>
            </Area>

            {/* Live Game Schedule */}
            {game.type === "live" && game.startDate && game.endDate && (
              <Container className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Area className="flex items-center gap-4">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <RText className="text-sm text-blue-800">
                    {formatDateTime(game.startDate)} -{" "}
                    {formatDateTime(game.endDate)}
                  </RText>
                </Area>
              </Container>
            )}
          </Yard>

          <Area className="flex gap-2 ml-4">
            {onPlay && (
              <button
                onClick={onPlay}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Play Game
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </Area>
        </Area>
      </Container>

      {/* Cover Image */}
      {game.coverImage && (
        <Container className="p-6 border-b border-gray-200">
          <img
            src={game.coverImage || "/placeholder.svg"}
            alt={game.title}
            className="w-full h-48 object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.src =
                "/placeholder.svg?height=200&width=600&text=Cover+Image";
            }}
          />
        </Container>
      )}

      {/* Questions Preview */}
      <Container className="p-6">
        <Area className="flex justify-between items-center mb-4">
          <RText className="text-lg font-semibold text-gray-900">
            Questions ({game.questions.length})
          </RText>
          {game.questions.length > 1 && (
            <Area className="flex items-center gap-2">
              <button
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <RText className="text-sm text-gray-600">
                {currentQuestionIndex + 1} of {game.questions.length}
              </RText>
              <button
                onClick={nextQuestion}
                disabled={currentQuestionIndex === game.questions.length - 1}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </Area>
          )}
        </Area>

        {currentQuestion && (
          <Container className="border border-gray-200 rounded-lg p-4">
            {/* Question Header */}
            <Area className="flex justify-between items-center mb-4">
              <RText className="text-lg font-medium text-gray-900">
                Question {currentQuestionIndex + 1}
              </RText>
              <Area className="flex items-center gap-4 text-sm text-gray-500">
                <RText>{currentQuestion.timeLimit}s</RText>
                <RText>{currentQuestion.points} pts</RText>
              </Area>
            </Area>

            {/* Question Content */}
            <RText className="text-gray-800 mb-4">
              {currentQuestion.content}
            </RText>

            {/* Question Image */}
            {currentQuestion.image && (
              <Yard className="mb-4">
                <img
                  src={currentQuestion.image || "/placeholder.svg"}
                  alt="Question"
                  className="max-h-48 object-contain rounded-lg border border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/placeholder.svg?height=200&width=400&text=Question+Image";
                  }}
                />
              </Yard>
            )}

            {/* Answer Options */}
            <Area className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {currentQuestion.options.map((option, index) => (
                <Yard
                  key={option.id}
                  className={`p-3 rounded-lg border ${
                    option.isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <Area className="flex items-center gap-2">
                    <Yard
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                        option.color === "red"
                          ? "bg-red-500"
                          : option.color === "blue"
                            ? "bg-blue-500"
                            : option.color === "yellow"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                      }`}
                    >
                      {index + 1}
                    </Yard>
                    <RText className="text-gray-800">{option.text}</RText>
                    {option.isCorrect && (
                      <Yard className="ml-auto text-green-600 text-sm font-medium">
                        ✓ Correct
                      </Yard>
                    )}
                  </Area>
                </Yard>
              ))}
            </Area>

            {/* Question Tags */}
            {currentQuestion.tags.length > 0 && (
              <Area className="flex flex-wrap gap-2">
                {currentQuestion.tags.map((tag) => (
                  <Yard
                    key={tag}
                    className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                  >
                    {tag}
                  </Yard>
                ))}
              </Area>
            )}
          </Container>
        )}

        {/* Game Statistics */}
        <Container className="mt-6 p-4 bg-gray-50 rounded-lg">
          <RText className="font-medium text-gray-900 mb-3">
            Game Statistics
          </RText>
          <Area className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Yard>
              <RText className="text-sm text-gray-500">Total Questions</RText>
              <RText className="text-lg font-semibold text-gray-900">
                {game.questions.length}
              </RText>
            </Yard>
            <Yard>
              <RText className="text-sm text-gray-500">Total Points</RText>
              <RText className="text-lg font-semibold text-gray-900">
                {game.totalPoints}
              </RText>
            </Yard>
            <Yard>
              <RText className="text-sm text-gray-500">
                Avg. Time per Question
              </RText>
              <RText className="text-lg font-semibold text-gray-900">
                {Math.round(
                  game.questions.reduce((sum, q) => sum + q.timeLimit, 0) /
                    game.questions.length
                )}
                s
              </RText>
            </Yard>
            <Yard>
              <RText className="text-sm text-gray-500">
                Estimated Duration
              </RText>
              <RText className="text-lg font-semibold text-gray-900">
                {Math.ceil(
                  game.questions.reduce((sum, q) => sum + q.timeLimit, 0) / 60
                )}{" "}
                min
              </RText>
            </Yard>
          </Area>
        </Container>
      </Container>
    </Core>
  );
}
