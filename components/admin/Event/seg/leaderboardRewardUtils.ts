"use client";

import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import {
  useGetLeaderboardRewardsQuery,
  useCreateLeaderboardRewardMutation,
  useUpdateLeaderboardRewardMutation,
  useDeleteLeaderboardRewardMutation,
  useAddVoucherTemplateToRewardMutation,
} from "@/process/api/api";
import type {
  LeaderboardReward,
  CreateLeaderboardRewardRequest,
  UpdateLeaderboardRewardRequest,
  AddVoucherTemplateToRewardRequest,
} from "@/types/event";

// Format date for display
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Get status color for active/inactive
export const getStatusColor = (reward: LeaderboardReward): string => {
  return reward.is_active
    ? "bg-green-100 text-green-800 border-green-200"
    : "bg-red-100 text-red-800 border-red-200";
};

// Get status text
export const getStatusText = (reward: LeaderboardReward): string => {
  return reward.is_active ? "Active" : "Inactive";
};

// Hook for managing leaderboard rewards
export const useLeaderboardRewardsLogic = (eventId: string = "1") => {
  const [selectedReward, setSelectedReward] =
    useState<LeaderboardReward | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);

  // Fetch leaderboard rewards
  const {
    data: rewards = [],
    isLoading,
    error,
    refetch,
  } = useGetLeaderboardRewardsQuery({ eventId });

  // Mutations
  const [createReward, { isLoading: isCreating }] =
    useCreateLeaderboardRewardMutation();
  const [updateReward, { isLoading: isUpdating }] =
    useUpdateLeaderboardRewardMutation();
  const [deleteReward, { isLoading: isDeleting }] =
    useDeleteLeaderboardRewardMutation();
  const [addVoucherTemplate, { isLoading: isAddingVoucher }] =
    useAddVoucherTemplateToRewardMutation();

  // Computed stats
  const stats = useMemo(() => {
    const total = rewards.length;
    const active = rewards.filter((r) => r.is_active).length;
    const inactive = total - active;
    const totalVoucherTemplates = rewards.reduce(
      (sum, reward) => sum + reward.voucherTemplates.length,
      0,
    );

    return {
      total,
      active,
      inactive,
      totalVoucherTemplates,
      activeRate: total > 0 ? Math.round((active / total) * 100) : 0,
    };
  }, [rewards]);

  // Handlers
  const handleAddReward = () => {
    setSelectedReward(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEditReward = (reward: LeaderboardReward) => {
    setSelectedReward(reward);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleViewReward = (reward: LeaderboardReward) => {
    setSelectedReward(reward);
    setIsDetailModalOpen(true);
  };

  const handleAddVoucherTemplate = (reward: LeaderboardReward) => {
    setSelectedReward(reward);
    setIsVoucherModalOpen(true);
  };

  const handleDeleteReward = async (rewardId: string) => {
    if (
      window.confirm("Are you sure you want to delete this leaderboard reward?")
    ) {
      try {
        await deleteReward({ eventId, rewardId }).unwrap();
        toast.success("Leaderboard reward deleted successfully!");
      } catch (error: unknown) {
        const errorMessage =
          error &&
          typeof error === "object" &&
          "data" in error &&
          error.data &&
          typeof error.data === "object" &&
          "message" in error.data
            ? String(error.data.message)
            : error && typeof error === "object" && "message" in error
              ? String(error.message)
              : "Failed to delete leaderboard reward";
        toast.error(errorMessage);
      }
    }
  };

  const handleSubmitReward = async (
    data: CreateLeaderboardRewardRequest | UpdateLeaderboardRewardRequest,
  ) => {
    try {
      if (isEditMode && selectedReward) {
        await updateReward({
          eventId,
          rewardId: selectedReward.id,
          data: data as UpdateLeaderboardRewardRequest,
        }).unwrap();
        toast.success("Leaderboard reward updated successfully!");
      } else {
        await createReward({
          eventId,
          data: data as CreateLeaderboardRewardRequest,
        }).unwrap();
        toast.success("Leaderboard reward created successfully!");
      }
      setIsModalOpen(false);
      setSelectedReward(null);
      setIsEditMode(false);
    } catch (error: unknown) {
      const errorMessage =
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "message" in error.data
          ? String(error.data.message)
          : error && typeof error === "object" && "message" in error
            ? String(error.message)
            : "Failed to save leaderboard reward";
      toast.error(errorMessage);
    }
  };

  const handleSubmitVoucherTemplate = async (
    data: AddVoucherTemplateToRewardRequest,
  ) => {
    if (!selectedReward) return;

    try {
      await addVoucherTemplate({
        eventId,
        rewardId: selectedReward.id,
        data,
      }).unwrap();
      setIsVoucherModalOpen(false);
      setSelectedReward(null);
      toast.success("Voucher template added to reward successfully!");
    } catch (error: unknown) {
      const errorMessage =
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "message" in error.data
          ? String(error.data.message)
          : error && typeof error === "object" && "message" in error
            ? String(error.message)
            : "Failed to add voucher template to reward";
      toast.error(errorMessage);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReward(null);
    setIsEditMode(false);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedReward(null);
  };

  const handleCloseVoucherModal = () => {
    setIsVoucherModalOpen(false);
    setSelectedReward(null);
  };

  return {
    // Data
    rewards,
    selectedReward,
    stats,

    // State
    isModalOpen,
    isEditMode,
    isDetailModalOpen,
    isVoucherModalOpen,
    isLoading:
      isLoading || isCreating || isUpdating || isDeleting || isAddingVoucher,
    error,

    // Actions
    handleAddReward,
    handleEditReward,
    handleDeleteReward,
    handleViewReward,
    handleAddVoucherTemplate,
    handleSubmitReward,
    handleSubmitVoucherTemplate,
    handleCloseModal,
    handleCloseDetailModal,
    handleCloseVoucherModal,
    refetch,
  };
};
