"use client";

import type React from "react";

import { useState } from "react";
import {
  Search,
  Clock,
  Users,
  Calendar,
  ImageIcon,
  X,
  GripVertical,
} from "lucide-react";
import { Area, RText, Yard, Container } from "@/lib/by/Div";
import { useGameForm } from "@/components/admin/Quiz/seg/utils";
import type { QuizGame, QuizQuestion } from "@/constants/manage-quizzes";

interface GameFormProps {
  onSubmit: (game: QuizGame) => void;
  onCancel: () => void;
  editGame?: QuizGame | null;
  availableQuestions: QuizQuestion[];
}

export function GameForm({
  onSubmit,
  onCancel,
  editGame,
  availableQuestions,
}: GameFormProps) {
  const {
    formData,
    errors,
    isSubmitting,
    searchTerm,
    setSearchTerm,
    selectedQuestionIds,
    filteredQuestions,
    handleInputChange,
    handleQuestionSelection,
    handleReorderQuestions,
    handleSubmit,
  } = useGameForm(editGame, availableQuestions);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newQuestions = [...formData.questions];
    const draggedQuestion = newQuestions[draggedIndex];
    newQuestions.splice(draggedIndex, 1);
    newQuestions.splice(dropIndex, 0, draggedQuestion);

    handleReorderQuestions(newQuestions);
    setDraggedIndex(null);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="space-y-6">
      {/* Basic Information */}
      <Container className="space-y-4">
        <RText className="text-lg font-semibold text-gray-900">
          Basic Information
        </RText>

        <Yard>
          <RText className="block text-sm font-medium text-gray-700 mb-2">
            Game Title *
          </RText>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Enter game title..."
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <RText className="text-red-500 text-sm mt-1">{errors.title}</RText>
          )}
        </Yard>

        <Yard>
          <RText className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </RText>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Enter game description..."
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <RText className="text-red-500 text-sm mt-1">
              {errors.description}
            </RText>
          )}
        </Yard>

        <Yard>
          <RText className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <ImageIcon className="w-4 h-4" />
            Cover Image (Optional)
          </RText>
          <input
            type="text"
            value={formData.coverImage || ""}
            onChange={(e) => handleInputChange("coverImage", e.target.value)}
            placeholder="Enter cover image URL..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          />
          {formData.coverImage && (
            <Yard className="mt-2">
              <img
                src={formData.coverImage || "/placeholder.svg"}
                alt="Cover preview"
                className="h-32 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  e.currentTarget.src =
                    "/placeholder.svg?height=120&width=200&text=Image+Error";
                }}
              />
            </Yard>
          )}
        </Yard>
      </Container>

      {/* Game Settings */}
      <Container className="space-y-4">
        <RText className="text-lg font-semibold text-gray-900">
          Game Settings
        </RText>

        <Area className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Yard>
            <RText className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Duration (minutes) *
            </RText>
            <input
              type="number"
              min="1"
              max="60"
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              placeholder="5"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                errors.duration ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.duration && (
              <RText className="text-red-500 text-sm mt-1">
                {errors.duration}
              </RText>
            )}
          </Yard>

          <Yard>
            <RText className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Users className="w-4 h-4" />
              Mode
            </RText>
            <select
              value={formData.mode}
              onChange={(e) => handleInputChange("mode", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            >
              <option value="individual">Individual</option>
              <option value="team">Team</option>
            </select>
          </Yard>

          <Yard>
            <RText className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </RText>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            >
              <option value="anytime">Anytime</option>
              <option value="live">Live</option>
            </select>
          </Yard>
        </Area>

        {/* Live Game Settings */}
        {formData.type === "live" && (
          <Area className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Yard>
              <RText className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Start Date & Time *
              </RText>
              <input
                type="datetime-local"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  errors.startDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.startDate && (
                <RText className="text-red-500 text-sm mt-1">
                  {errors.startDate}
                </RText>
              )}
            </Yard>

            <Yard>
              <RText className="block text-sm font-medium text-gray-700 mb-2">
                End Date & Time *
              </RText>
              <input
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  errors.endDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.endDate && (
                <RText className="text-red-500 text-sm mt-1">
                  {errors.endDate}
                </RText>
              )}
            </Yard>
          </Area>
        )}
      </Container>

      {/* Question Selection */}
      <Container className="space-y-4">
        <RText className="text-lg font-semibold text-gray-900">
          Select Questions
        </RText>
        {errors.questions && (
          <RText className="text-red-500 text-sm">{errors.questions}</RText>
        )}

        {/* Search Questions */}
        <Yard className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          />
        </Yard>

        {/* Available Questions */}
        <Container className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
          {filteredQuestions.length === 0 ? (
            <Yard className="p-4 text-center text-gray-500">
              No questions found. {searchTerm && "Try adjusting your search."}
            </Yard>
          ) : (
            <Area className="space-y-2 p-2">
              {filteredQuestions.map((question) => (
                <Yard
                  key={question.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedQuestionIds.includes(question.id)
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleQuestionSelection(question.id)}
                >
                  <Area className="flex items-start justify-between">
                    <Yard className="flex-1">
                      <RText className="font-medium text-gray-900 mb-1">
                        {question.content}
                      </RText>
                      <Area className="flex items-center gap-4 text-sm text-gray-500">
                        <RText>{question.timeLimit}s</RText>
                        <RText>{question.points} pts</RText>
                        <Area className="flex gap-1">
                          {question.tags.slice(0, 2).map((tag) => (
                            <Yard
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                            >
                              {tag}
                            </Yard>
                          ))}
                          {question.tags.length > 2 && (
                            <Yard className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              +{question.tags.length - 2}
                            </Yard>
                          )}
                        </Area>
                      </Area>
                    </Yard>
                    <Yard className="ml-2">
                      {selectedQuestionIds.includes(question.id) ? (
                        <Yard className="w-5 h-5 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs">
                          ✓
                        </Yard>
                      ) : (
                        <Yard className="w-5 h-5 border-2 border-gray-300 rounded-full"></Yard>
                      )}
                    </Yard>
                  </Area>
                </Yard>
              ))}
            </Area>
          )}
        </Container>
      </Container>

      {/* Selected Questions Order */}
      {formData.questions.length > 0 && (
        <Container className="space-y-4">
          <RText className="text-lg font-semibold text-gray-900">
            Question Order ({formData.questions.length} selected)
          </RText>
          <RText className="text-sm text-gray-600">
            Drag and drop to reorder questions
          </RText>

          <Area className="space-y-2">
            {formData.questions.map((question, index) => (
              <Yard
                key={question.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className="p-3 bg-white border border-gray-200 rounded-lg cursor-move hover:border-gray-300 transition-colors"
              >
                <Area className="flex items-center gap-3">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <RText className="w-8 h-8 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </RText>
                  <Yard className="flex-1">
                    <RText className="font-medium text-gray-900">
                      {question.content}
                    </RText>
                    <RText className="text-sm text-gray-500">
                      {question.timeLimit}s • {question.points} pts
                    </RText>
                  </Yard>
                  <button
                    type="button"
                    onClick={() => handleQuestionSelection(question.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </Area>
              </Yard>
            ))}
          </Area>

          {/* Game Summary */}
          <Container className="p-4 bg-gray-50 rounded-lg border">
            <RText className="font-medium text-gray-900 mb-2">
              Game Summary
            </RText>
            <Area className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <Yard>
                <RText className="text-gray-500">Questions</RText>
                <RText className="font-medium">
                  {formData.questions.length}
                </RText>
              </Yard>
              <Yard>
                <RText className="text-gray-500">Total Points</RText>
                <RText className="font-medium">
                  {formData.questions.reduce((sum, q) => sum + q.points, 0)}
                </RText>
              </Yard>
              <Yard>
                <RText className="text-gray-500">Est. Time</RText>
                <RText className="font-medium">
                  {Math.ceil(
                    formData.questions.reduce(
                      (sum, q) => sum + q.timeLimit,
                      0
                    ) / 60
                  )}{" "}
                  min
                </RText>
              </Yard>
              <Yard>
                <RText className="text-gray-500">Duration</RText>
                <RText className="font-medium">{formData.duration} min</RText>
              </Yard>
            </Area>
          </Container>
        </Container>
      )}

      {/* Actions */}
      <Area className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting
            ? "Saving..."
            : editGame
              ? "Update Game"
              : "Create Game"}
        </button>
      </Area>
    </form>
  );
}
