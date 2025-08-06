"use client";

import { useState, useMemo } from "react";
import {
  useGetVoucherTemplatesQuery,
  useCreateVoucherTemplateMutation,
  useUpdateVoucherTemplateMutation,
  useDeleteVoucherTemplateMutation,
} from "@/process/api/api";
import type {
  VoucherTemplate,
  VoucherTemplateFilterParams,
  CreateVoucherTemplateRequest,
  UpdateVoucherTemplateRequest,
} from "@/types/voucher/index";

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

// Get discount display text
export const getDiscountDisplay = (template: VoucherTemplate): string => {
  if (template.type === "PERCENT") {
    return `${template.discount_value}%`;
  }
  return `₫${template.discount_value.toLocaleString()}`;
};

// Get status color for active/inactive
export const getStatusColor = (template: VoucherTemplate): string => {
  return template.is_active
    ? "bg-green-100 text-green-800 border-green-200"
    : "bg-red-100 text-red-800 border-red-200";
};

// Get status text
export const getStatusText = (template: VoucherTemplate): string => {
  return template.is_active ? "Active" : "Inactive";
};

// Hook for managing voucher templates
export const useVoucherTemplatesLogic = (eventId: string = "1") => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<VoucherTemplate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [filterParams, setFilterParams] = useState<VoucherTemplateFilterParams>(
    {
      is_active: true,
      include_leaderboard: false,
    },
  );

  // Fetch voucher templates
  const {
    data: templates = [],
    isLoading,
    error,
    refetch,
  } = useGetVoucherTemplatesQuery({ eventId, params: filterParams });

  // Mutations
  const [createTemplate, { isLoading: isCreating }] =
    useCreateVoucherTemplateMutation();
  const [updateTemplate, { isLoading: isUpdating }] =
    useUpdateVoucherTemplateMutation();
  const [deleteTemplate, { isLoading: isDeleting }] =
    useDeleteVoucherTemplateMutation();

  // Computed stats
  const stats = useMemo(() => {
    const total = templates.length;
    const active = templates.filter((t: VoucherTemplate) => t.is_active).length;
    const inactive = total - active;
    const percentTemplates = templates.filter(
      (t: VoucherTemplate) => t.type === "PERCENT",
    ).length;
    const amountTemplates = templates.filter(
      (t: VoucherTemplate) => t.type === "AMOUNT",
    ).length;

    return {
      total,
      active,
      inactive,
      percentTemplates,
      amountTemplates,
      activeRate: total > 0 ? Math.round((active / total) * 100) : 0,
    };
  }, [templates]);

  // Handlers
  const handleAddTemplate = () => {
    setSelectedTemplate(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEditTemplate = (template: VoucherTemplate) => {
    setSelectedTemplate(template);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleViewTemplate = (template: VoucherTemplate) => {
    setSelectedTemplate(template);
    setIsDetailModalOpen(true);
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (
      window.confirm("Are you sure you want to delete this voucher template?")
    ) {
      try {
        await deleteTemplate({ eventId, voucherId: templateId }).unwrap();
        // Success message will be handled by the API toast
      } catch (error) {
        console.error("error", error);
        // Error message will be handled by the API toast
      }
    }
  };

  const handleSubmitTemplate = async (
    data: CreateVoucherTemplateRequest | UpdateVoucherTemplateRequest,
  ) => {
    try {
      if (isEditMode && selectedTemplate) {
        await updateTemplate({
          eventId,
          voucherId: selectedTemplate.id,
          data: data as UpdateVoucherTemplateRequest,
        }).unwrap();
      } else {
        await createTemplate({
          eventId,
          data: data as CreateVoucherTemplateRequest,
        }).unwrap();
      }
      setIsModalOpen(false);
      setSelectedTemplate(null);
      setIsEditMode(false);
      // Success message will be handled by the API toast
    } catch (error) {
      console.error("error", error);
      // Error message will be handled by the API toast
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
    setIsEditMode(false);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedTemplate(null);
  };

  const handleFilterChange = (
    newParams: Partial<VoucherTemplateFilterParams>,
  ) => {
    setFilterParams((prev) => ({ ...prev, ...newParams }));
  };

  return {
    // Data
    templates,
    selectedTemplate,
    stats,

    // State
    isModalOpen,
    isEditMode,
    isDetailModalOpen,
    filterParams,
    isLoading: isLoading || isCreating || isUpdating || isDeleting,
    error,

    // Actions
    handleAddTemplate,
    handleEditTemplate,
    handleDeleteTemplate,
    handleViewTemplate,
    handleSubmitTemplate,
    handleCloseModal,
    handleCloseDetailModal,
    handleFilterChange,
    refetch,
  };
};
