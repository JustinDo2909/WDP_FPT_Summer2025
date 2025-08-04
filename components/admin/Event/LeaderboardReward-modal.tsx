"use client";

import { useState, useEffect } from "react";
import { Area, RText, Yard, Container } from "@/lib/by/Div";
import { X } from "lucide-react";
import type {
  LeaderboardReward,
  CreateLeaderboardRewardRequest,
  UpdateLeaderboardRewardRequest,
} from "@/types/event";

interface LeaderboardRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateLeaderboardRewardRequest | UpdateLeaderboardRewardRequest
  ) => void;
  isLoading?: boolean;
  reward?: LeaderboardReward | null;
}

export function LeaderboardRewardModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  reward,
}: LeaderboardRewardModalProps) {
  const [title, setTitle] = useState("");
  const [rankFrom, setRankFrom] = useState("");
  const [rankTo, setRankTo] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (reward) {
      setTitle(reward.title);
      setRankFrom(reward.rank_from.toString());
      setRankTo(reward.rank_to.toString());
      setDescription(reward.description);
    } else {
      setTitle("");
      setRankFrom("");
      setRankTo("");
      setDescription("");
    }
  }, [reward]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      title: title.trim(),
      rank_from: parseInt(rankFrom),
      rank_to: parseInt(rankTo),
      description: description.trim(),
    };

    onSubmit(data);
  };

  const isFormValid =
    title.trim() &&
    rankFrom &&
    rankTo &&
    description.trim() &&
    parseInt(rankFrom) > 0 &&
    parseInt(rankTo) > 0 &&
    parseInt(rankFrom) <= parseInt(rankTo);

  if (!isOpen) return null;

  return (
    <Area
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
      onClick={onClose}
    >
      <Container
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <Area className="flex items-center justify-between p-6 border-b flex-shrink-0">
          <RText className="text-xl font-semibold text-gray-900">
            {reward ? "Edit Leaderboard Reward" : "Add Leaderboard Reward"}
          </RText>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </Area>

        {/* Content - Scrollable */}
        <Area className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <Yard>
              <RText className="text-sm font-medium text-gray-700 mb-2">
                Title *
              </RText>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter reward title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </Yard>

            {/* Rank Range */}
            <Area className="grid grid-cols-2 gap-4">
              <Yard>
                <RText className="text-sm font-medium text-gray-700 mb-2">
                  Rank From *
                </RText>
                <input
                  type="number"
                  min="1"
                  value={rankFrom}
                  onChange={(e) => setRankFrom(e.target.value)}
                  placeholder="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </Yard>
              <Yard>
                <RText className="text-sm font-medium text-gray-700 mb-2">
                  Rank To *
                </RText>
                <input
                  type="number"
                  min="1"
                  value={rankTo}
                  onChange={(e) => setRankTo(e.target.value)}
                  placeholder="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </Yard>
            </Area>

            {/* Description */}
            <Yard>
              <RText className="text-sm font-medium text-gray-700 mb-2">
                Description *
              </RText>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter reward description..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </Yard>
          </form>
        </Area>

        {/* Footer - Fixed */}
        <Area className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !isFormValid}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading
              ? "Saving..."
              : reward
                ? "Update Reward"
                : "Create Reward"}
          </button>
        </Area>
      </Container>
    </Area>
  );
}
