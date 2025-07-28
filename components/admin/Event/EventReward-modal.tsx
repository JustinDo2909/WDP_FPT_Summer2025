"use client";

import { useState, useEffect } from "react";
import { X, Calendar, Gift, Search } from "lucide-react";
import { Yard } from "@/lib/by/Div";
import type { Event } from "@/types/event";

interface EventRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rewardData: {
    event_id: string;
    min_correct: number;
    max_correct: number;
    voucher_quantity: number;
    discount_value: number;
    type: "AMOUNT" | "PERCENT";
  }) => void;
  events: Event[];
}

export function EventRewardModal({
  isOpen,
  onClose,
  onSave,
  events,
}: EventRewardModalProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    min_correct: 15,
    max_correct: 15,
    voucher_quantity: 100,
    discount_value: 50000,
    type: "AMOUNT" as "AMOUNT" | "PERCENT",
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedEvent(null);
      setSearchTerm("");
      setFormData({
        min_correct: 15,
        max_correct: 15,
        voucher_quantity: 100,
        discount_value: 50000,
        type: "AMOUNT",
      });
    }
  }, [isOpen]);

  // Filter events based on search term
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEvent) {
      alert("Please select an event first");
      return;
    }

    if (formData.min_correct < 0 || formData.max_correct < 0) {
      alert("Correct answers must be non-negative");
      return;
    }

    if (formData.min_correct > formData.max_correct) {
      alert("Min correct cannot be greater than max correct");
      return;
    }

    if (formData.voucher_quantity <= 0) {
      alert("Voucher quantity must be greater than 0");
      return;
    }

    if (formData.discount_value <= 0) {
      alert("Discount value must be greater than 0");
      return;
    }

    onSave({
      event_id: selectedEvent.id,
      min_correct: formData.min_correct,
      max_correct: formData.max_correct,
      voucher_quantity: formData.voucher_quantity,
      discount_value: formData.discount_value,
      type: formData.type,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Yard className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Yard className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <Yard className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Gift className="w-5 h-5 text-blue-600" />
            Add Event Reward
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </Yard>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Select Event */}
          <Yard className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Step 1: Select Event
            </h3>

            {/* Search Bar */}
            <Yard className="mb-4">
              <Yard className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </Yard>
            </Yard>

            {/* Event List */}
            <Yard className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <Yard
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      selectedEvent?.id === event.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <Yard className="flex items-start justify-between">
                      <Yard className="flex-1">
                        <h4 className="font-medium text-gray-900 line-clamp-1">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                          {event.description}
                        </p>
                        <Yard className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                          <span>
                            Start:{" "}
                            {new Date(event.start_time).toLocaleDateString()}
                          </span>
                          <span>
                            End: {new Date(event.end_time).toLocaleDateString()}
                          </span>
                        </Yard>
                      </Yard>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {event.is_active ? "Active" : "Inactive"}
                      </span>
                    </Yard>
                  </Yard>
                ))
              ) : (
                <Yard className="col-span-full text-center text-gray-500 py-8">
                  No events found
                </Yard>
              )}
            </Yard>

            {selectedEvent && (
              <Yard className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Selected Event:</span>{" "}
                  {selectedEvent.title}
                </p>
              </Yard>
            )}
          </Yard>

          {/* Step 2: Reward Configuration */}
          <Yard className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Step 2: Configure Reward
            </h3>

            <Yard className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Correct Answers Range */}
              <Yard>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Correct Answers
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.min_correct}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      min_correct: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </Yard>

              <Yard>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Correct Answers
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.max_correct}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      max_correct: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </Yard>

              {/* Voucher Quantity */}
              <Yard>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Voucher Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.voucher_quantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      voucher_quantity: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </Yard>

              {/* Discount Type */}
              <Yard>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Type
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
                  required
                >
                  <option value="AMOUNT">Fixed Amount (VND)</option>
                  <option value="PERCENT">Percentage (%)</option>
                </select>
              </Yard>

              {/* Discount Value */}
              <Yard className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Value {formData.type === "AMOUNT" ? "(VND)" : "(%)"}
                </label>
                <input
                  type="number"
                  min="1"
                  max={formData.type === "PERCENT" ? "100" : undefined}
                  value={formData.discount_value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discount_value: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={formData.type === "AMOUNT" ? "50000" : "10"}
                  required
                />
              </Yard>
            </Yard>

            {/* Preview */}
            <Yard className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Preview:</span> Users who answer{" "}
                {formData.min_correct === formData.max_correct
                  ? `exactly ${formData.min_correct}`
                  : `between ${formData.min_correct} and ${formData.max_correct}`}{" "}
                questions correctly will receive a{" "}
                {formData.type === "AMOUNT"
                  ? `${formData.discount_value.toLocaleString()} VND`
                  : `${formData.discount_value}%`}{" "}
                discount voucher. Total {formData.voucher_quantity} vouchers
                available.
              </p>
            </Yard>
          </Yard>

          {/* Submit Buttons */}
          <Yard className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedEvent}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Gift className="w-4 h-4" />
              Create Reward
            </button>
          </Yard>
        </form>
      </Yard>
    </Yard>
  );
}
 