"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { EventReward } from "@/types/event";
import { Yard } from "@/lib/by/Div";
import { validateRewardForm } from "./seg/utils";

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reward: Partial<EventReward>) => void;
  reward?: EventReward | null;
  mode: "create" | "edit";
  eventId: string;
}

export function RewardModal({
  isOpen,
  onClose,
  onSave,
  reward,
  mode,
  eventId,
}: RewardModalProps) {
  const [formData, setFormData] = useState({
    min_correct: 0,
    discount_value: 0,
    type: "AMOUNT" as "AMOUNT" | "PERCENT",
  });

  useEffect(() => {
    if (reward && mode === "edit") {
      setFormData({
        min_correct: reward.min_correct,
        discount_value: reward.discount_value,
        type: reward.type,
      });
    } else {
      setFormData({
        min_correct: 0,
        discount_value: 0,
        type: "AMOUNT",
      });
    }
  }, [reward, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateRewardForm(formData);
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
      <Yard className="bg-white rounded-lg p-6 w-full max-w-md">
        <Yard className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {mode === "create" ? "Create Reward" : "Edit Reward"}
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
              Minimum Correct Answers
            </label>
            <input
              type="number"
              min="0"
              value={formData.min_correct}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  min_correct: Number.parseInt(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </Yard>

          <Yard>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reward Type
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as "AMOUNT" | "PERCENT",
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="AMOUNT">Fixed Amount</option>
              <option value="PERCENT">Percentage</option>
            </select>
          </Yard>

          <Yard>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {formData.type === "AMOUNT"
                ? "Discount Amount (VND)"
                : "Discount Percentage (%)"}
            </label>
            <input
              type="number"
              min="0"
              value={formData.discount_value}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  discount_value: Number.parseInt(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
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
