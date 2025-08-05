"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Event } from "@/types/event";
import { Yard } from "@/lib/by/Div";

// Import validation and formatting functions
import { validateEventForm, formatEventData } from "./seg/utils";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Partial<Event>) => void;
  event?: Event | null;
  mode: "create" | "edit";
}

export function EventModal({
  isOpen,
  onClose,
  onSave,
  event,
  mode,
}: EventModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    type: "QUIZ",
    is_active: true,
  });

  useEffect(() => {
    if (event && mode === "edit") {
      setFormData({
        title: event.title,
        description: event.description,
        start_time: event.start_time.slice(0, 16),
        end_time: event.end_time.slice(0, 16),
        type: event.type || "QUIZ",
        is_active: event.is_active,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        start_time: "",
        end_time: "",
        type: "QUIZ",
        is_active: true,
      });
    }
  }, [event, mode]);

  // Update the handleSubmit function to use validation:
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateEventForm(formData);
    if (!validation.isValid) {
      alert(validation.errors.join("\n"));
      return;
    }

    const formattedData = formatEventData(formData);
    onSave(formattedData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Yard className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Yard className="bg-white rounded-lg p-6 w-full max-w-md">
        <Yard className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {mode === "create" ? "Create Event" : "Edit Event"}
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
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </Yard>

          <Yard>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              required
            />
          </Yard>

          <Yard>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="datetime-local"
              value={formData.start_time}
              onChange={(e) =>
                setFormData({ ...formData, start_time: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </Yard>

          <Yard>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="datetime-local"
              value={formData.end_time}
              onChange={(e) =>
                setFormData({ ...formData, end_time: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </Yard>

          <Yard>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Type
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="QUIZ">Quiz</option>
              <option value="DROP">Drop</option>
              <option value="ARCADE">Arcade</option>
            </select>
          </Yard>

          <Yard className="flex items-center">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) =>
                setFormData({ ...formData, is_active: e.target.checked })
              }
              className="rounded border-gray-300"
            />
            <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
              Active
            </label>
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
