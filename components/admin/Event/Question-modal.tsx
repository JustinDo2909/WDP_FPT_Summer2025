"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Question, QuestionOption } from "@/types/event";
import { Yard } from "@/lib/by/Div";
// Import validation function
import { validateQuestionForm } from "./seg/utils";

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: Partial<Question>) => void;
  question?: Question | null;
  mode: "create" | "edit";
  eventId: string;
}

export function QuestionModal({
  isOpen,
  onClose,
  onSave,
  question,
  mode,
  eventId,
}: QuestionModalProps) {
  const [formData, setFormData] = useState({
    content: "",
    image_url: "",
    questionOptions: [
      { content: "", is_correct: false },
      { content: "", is_correct: false },
      { content: "", is_correct: false },
      { content: "", is_correct: false },
    ] as QuestionOption[],
  });

  useEffect(() => {
    if (question && mode === "edit") {
      setFormData({
        content: question.content,
        image_url: question.image_url || "",
        questionOptions: question.questionOptions.map((option) => ({
          id: option.id,
          content: option.content,
          is_correct: option.is_correct,
          question_id: option.question_id,
          createdAt: option.createdAt,
          updatedAt: option.updatedAt,
        })),
      });
    } else {
      setFormData({
        content: "",
        image_url: "",
        questionOptions: [
          {
            id: "",
            content: "",
            is_correct: false,
            question_id: "",
            createdAt: "",
            updatedAt: "",
          },
          {
            id: "",
            content: "",
            is_correct: false,
            question_id: "",
            createdAt: "",
            updatedAt: "",
          },
          {
            id: "",
            content: "",
            is_correct: false,
            question_id: "",
            createdAt: "",
            updatedAt: "",
          },
          {
            id: "",
            content: "",
            is_correct: false,
            question_id: "",
            createdAt: "",
            updatedAt: "",
          },
        ],
      });
    }
  }, [question, mode]);

  const handleOptionChange = (
    index: number,
    field: keyof QuestionOption,
    value: string | boolean
  ) => {
    // Deep copy to avoid read-only property errors
    const newOptions = formData.questionOptions.map((opt) => ({
      id: opt.id,
      content: opt.content,
      is_correct: opt.is_correct,
      question_id: opt.question_id,
      createdAt: opt.createdAt,
      updatedAt: opt.updatedAt,
    }));

    if (field === "is_correct" && value === true) {
      // Only one correct answer allowed - set all to false first
      newOptions.forEach((opt) => {
        opt.is_correct = false;
      });
      // Then set the selected one to true
      newOptions[index].is_correct = true;
    } else if (field === "content") {
      newOptions[index].content = value as string;
    }

    setFormData({ ...formData, questionOptions: newOptions });
  };

  // Update the handleSubmit function to use validation:
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateQuestionForm(formData);
    if (!validation.isValid) {
      alert(validation.errors.join("\n"));
      return;
    }

    onSave({
      ...formData,
      event_id: eventId,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Yard className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Yard className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Yard className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {mode === "create" ? "Create Question" : "Edit Question"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </Yard>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Yard>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              required
            />
          </Yard>

          <Yard>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL (Optional)
            </label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) =>
                setFormData({ ...formData, image_url: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </Yard>

          <Yard>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Answer Options (Select one correct answer)
            </label>
            <Yard className="space-y-3">
              {formData.questionOptions.map((option, index) => (
                <Yard
                  key={index}
                  className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg"
                >
                  <input
                    type="radio"
                    name="correct_answer"
                    value={index}
                    checked={option.is_correct}
                    onChange={() =>
                      handleOptionChange(index, "is_correct", true)
                    }
                    className="text-blue-600"
                  />
                  <input
                    type="text"
                    value={option.content}
                    onChange={(e) =>
                      handleOptionChange(index, "content", e.target.value)
                    }
                    placeholder={`Answer ${index + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <span className="text-xs text-gray-500">
                    {option.is_correct ? "Correct" : ""}
                  </span>
                </Yard>
              ))}
            </Yard>
          </Yard>

          <Yard className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {mode === "create" ? "Create" : "Update"}
            </button>
          </Yard>
        </form>
      </Yard>
    </Yard>
  );
}
