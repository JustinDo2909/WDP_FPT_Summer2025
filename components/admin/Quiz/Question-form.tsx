"use client";

import { useState } from "react";
import { ImageIcon, Clock, Tag, Plus, Check } from "lucide-react";
import { Area, RText, Yard } from "@/lib/by/Div";
import { useQuestionForm } from "@/components/admin/Quiz/seg/utils";
import { QuizQuestion, sampleTags } from "@/constants/manage-quizzes";

interface QuestionFormProps {
  onSubmit: (question: QuizQuestion) => void;
  onCancel: () => void;
  editQuestion?: QuizQuestion | null;
  availableTags?: string[];
}

export function QuestionForm({
  onSubmit,
  onCancel,
  editQuestion,
  availableTags = sampleTags,
}: QuestionFormProps) {
  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleOptionChange,
    handleTagChange,
    handleSubmit,
  } = useQuestionForm(editQuestion);
  const [newTag, setNewTag] = useState("");

  const handleAddNewTag = () => {
    if (newTag.trim() && !availableTags.includes(newTag.trim())) {
      handleTagChange(newTag.trim());
      setNewTag("");
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="space-y-6">
      {/* Question Content */}
      <Yard>
        <RText className="block text-sm font-medium text-gray-700 mb-2">
          Question Content *
        </RText>
        <textarea
          value={formData.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
          placeholder="Enter your question here..."
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
            errors.content ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.content && (
          <RText className="text-red-500 text-sm mt-1">{errors.content}</RText>
        )}
      </Yard>

      {/* Image URL */}
      <Yard>
        <RText className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
          <ImageIcon className="w-4 h-4" />
          Image URL (Optional)
        </RText>
        <input
          type="text"
          value={formData.image || ""}
          onChange={(e) => handleInputChange("image", e.target.value)}
          placeholder="Enter image URL or select from gallery"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        />
        {formData.image && (
          <Yard className="mt-2">
            <img
              src={formData.image || "/placeholder.svg"}
              alt="Question preview"
              className="h-40 object-contain rounded-lg border border-gray-200"
              onError={(e) => {
                e.currentTarget.src =
                  "/placeholder.svg?height=150&width=300&text=Image+Error";
              }}
            />
          </Yard>
        )}
      </Yard>

      {/* Time Limit and Points */}
      <Area className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Yard>
          <RText className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Time Limit (seconds) *
          </RText>
          <input
            type="number"
            min="5"
            max="120"
            value={formData.timeLimit}
            onChange={(e) => handleInputChange("timeLimit", e.target.value)}
            placeholder="20"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
              errors.timeLimit ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.timeLimit && (
            <RText className="text-red-500 text-sm mt-1">
              {errors.timeLimit}
            </RText>
          )}
        </Yard>

        <Yard>
          <RText className="block text-sm font-medium text-gray-700 mb-2">
            Points *
          </RText>
          <input
            type="number"
            min="10"
            step="10"
            value={formData.points}
            onChange={(e) => handleInputChange("points", e.target.value)}
            placeholder="100"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
              errors.points ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.points && (
            <RText className="text-red-500 text-sm mt-1">{errors.points}</RText>
          )}
        </Yard>
      </Area>

      {/* Answer Options */}
      <Yard>
        <RText className="block text-sm font-medium text-gray-700 mb-2">
          Answer Options *
        </RText>
        {errors.options && (
          <RText className="text-red-500 text-sm mb-2">{errors.options}</RText>
        )}

        <Area className="space-y-3">
          {formData.options.map((option, index) => (
            <Area
              key={index}
              className={`flex items-center gap-2 p-3 rounded-lg border ${
                option.isCorrect
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
              }`}
            >
              <Yard
                className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center ${
                  option.color === "red"
                    ? "bg-red-500"
                    : option.color === "blue"
                      ? "bg-blue-500"
                      : option.color === "yellow"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                } text-white`}
              >
                {index + 1}
              </Yard>
              <input
                type="text"
                value={option.text}
                onChange={(e) =>
                  handleOptionChange(index, "text", e.target.value)
                }
                placeholder={`Option ${index + 1}`}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => handleOptionChange(index, "isCorrect", true)}
                className={`p-2 rounded-full ${
                  option.isCorrect
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
                title="Mark as correct answer"
              >
                <Check className="w-5 h-5" />
              </button>
            </Area>
          ))}
        </Area>
      </Yard>

      {/* Tags */}
      <Yard>
        <RText className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
          <Tag className="w-4 h-4" />
          Tags
        </RText>
        <Area className="flex flex-wrap gap-2 mb-3">
          {availableTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagChange(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                formData.tags.includes(tag)
                  ? "bg-purple-100 text-purple-800 border-purple-300"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
              } border`}
            >
              {tag}
            </button>
          ))}
        </Area>

        {/* Add new tag */}
        <Area className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add new tag..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddNewTag}
            disabled={!newTag.trim()}
            className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </Area>
      </Yard>

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
            : editQuestion
              ? "Update Question"
              : "Add Question"}
        </button>
      </Area>
    </form>
  );
}
