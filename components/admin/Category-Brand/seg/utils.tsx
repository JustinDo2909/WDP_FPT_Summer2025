"use client";

import type React from "react";
import { useState, useCallback } from "react";
import type {
  CategoryOption,
  BrandOption,
  SkinTypeOption,
  CategoryFormData,
  BrandFormData,
  SkinTypeFormData,
} from "@/types/meta/index";
import {
  useGetMetaDataQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useCreateSkinTypeMutation,
  useUpdateSkinTypeMutation,
  useDeleteSkinTypeMutation,
} from "@/process/api/api";

// Hook quản lý categories, brands và skin types với API
export const useCategoriesBrandsLogic = () => {
  const { data: metaData, isLoading, error } = useGetMetaDataQuery();

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [createBrand] = useCreateBrandMutation();
  const [updateBrand] = useUpdateBrandMutation();
  const [deleteBrand] = useDeleteBrandMutation();

  const [createSkinType] = useCreateSkinTypeMutation();
  const [updateSkinType] = useUpdateSkinTypeMutation();
  const [deleteSkinType] = useDeleteSkinTypeMutation();

  const [activeTab, setActiveTab] = useState<
    "categories" | "brands" | "skinTypes"
  >("categories");

  // Category states
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryOption | null>(
    null
  );

  // Brand states
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<BrandOption | null>(null);

  // Skin Type states
  const [isSkinTypeModalOpen, setIsSkinTypeModalOpen] = useState(false);
  const [editingSkinType, setEditingSkinType] = useState<SkinTypeOption | null>(
    null
  );

  // Data from API
  const categories = metaData?.data?.categories || [];
  const brands = metaData?.data?.brands || [];
  const skinTypes = metaData?.data?.skinTypes || [];

  // Utility function to extract error message
  const getErrorMessage = (error: unknown) => {
    if (error && typeof error === "object") {
      const err = error as Record<string, unknown>;
      if (err.data && typeof err.data === "object") {
        const data = err.data as Record<string, unknown>;
        if (typeof data.message === "string") return data.message;
      }
      if (typeof err.message === "string") return err.message;
      if (typeof err.error === "string") return err.error;
      if (typeof err.status === "number") {
        return `HTTP ${err.status}: ${err.data || "Request failed"}`;
      }
    }
    if (typeof error === "string") return error;
    return "An unexpected error occurred. Please check your network connection.";
  };

  // Category handlers
  const handleAddCategory = useCallback(() => {
    setEditingCategory(null);
    setIsCategoryModalOpen(true);
  }, []);

  const handleEditCategory = useCallback((category: CategoryOption) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  }, []);

  const handleCloseCategoryModal = useCallback(() => {
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  }, []);

  const handleSubmitCategory = useCallback(
    async (categoryData: Omit<CategoryOption, "id">) => {
      try {
        if (editingCategory) {
          await updateCategory({
            ...categoryData,
            id: editingCategory.id,
          }).unwrap();
        } else {
          await createCategory(categoryData).unwrap();
        }
        setIsCategoryModalOpen(false);
        setEditingCategory(null);
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        alert(`Failed to save category: ${errorMessage}`);
        throw new Error(errorMessage);
      }
    },
    [editingCategory, createCategory, updateCategory]
  );

  const handleDeleteCategory = useCallback(
    async (categoryId: string) => {
      const category = categories.find((c) => c.id === categoryId);
      if (!category) return;

      if (
        confirm(
          `Are you sure you want to delete category "${category.title}"? This action cannot be undone.`
        )
      ) {
        try {
          await deleteCategory(category).unwrap();
        } catch (error: unknown) {
          const errorMessage = getErrorMessage(error);
          alert(`Failed to delete category: ${errorMessage}`);
        }
      }
    },
    [categories, deleteCategory]
  );

  // Brand handlers
  const handleAddBrand = useCallback(() => {
    setEditingBrand(null);
    setIsBrandModalOpen(true);
  }, []);

  const handleEditBrand = useCallback((brand: BrandOption) => {
    setEditingBrand(brand);
    setIsBrandModalOpen(true);
  }, []);

  const handleCloseBrandModal = useCallback(() => {
    setIsBrandModalOpen(false);
    setEditingBrand(null);
  }, []);

  const handleSubmitBrand = useCallback(
    async (brandData: Omit<BrandOption, "id">) => {
      try {
        if (editingBrand) {
          await updateBrand({ ...brandData, id: editingBrand.id }).unwrap();
        } else {
          await createBrand(brandData).unwrap();
        }
        setIsBrandModalOpen(false);
        setEditingBrand(null);
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        alert(`Failed to save brand: ${errorMessage}`);
        throw new Error(errorMessage);
      }
    },
    [editingBrand, createBrand, updateBrand]
  );

  const handleDeleteBrand = useCallback(
    async (brandId: string) => {
      const brand = brands.find((b) => b.id === brandId);
      if (!brand) return;

      if (
        confirm(
          `Are you sure you want to delete brand "${brand.title}"? This action cannot be undone.`
        )
      ) {
        try {
          await deleteBrand(brand).unwrap();
        } catch (error: unknown) {
          const errorMessage = getErrorMessage(error);
          alert(`Failed to delete brand: ${errorMessage}`);
        }
      }
    },
    [brands, deleteBrand]
  );

  // Skin Type handlers
  const handleAddSkinType = useCallback(() => {
    setEditingSkinType(null);
    setIsSkinTypeModalOpen(true);
  }, []);

  const handleEditSkinType = useCallback((skinType: SkinTypeOption) => {
    setEditingSkinType(skinType);
    setIsSkinTypeModalOpen(true);
  }, []);

  const handleCloseSkinTypeModal = useCallback(() => {
    setIsSkinTypeModalOpen(false);
    setEditingSkinType(null);
  }, []);

  const handleSubmitSkinType = useCallback(
    async (skinTypeData: Omit<SkinTypeOption, "id">) => {
      try {
        if (editingSkinType) {
          await updateSkinType({
            ...skinTypeData,
            id: editingSkinType.id,
          }).unwrap();
        } else {
          await createSkinType(skinTypeData).unwrap();
        }
        setIsSkinTypeModalOpen(false);
        setEditingSkinType(null);
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        alert(`Failed to save skin type: ${errorMessage}`);
        throw new Error(errorMessage);
      }
    },
    [editingSkinType, createSkinType, updateSkinType]
  );

  const handleDeleteSkinType = useCallback(
    async (skinTypeId: string) => {
      const skinType = skinTypes.find((st) => st.id === skinTypeId);
      if (!skinType) return;

      if (
        confirm(
          `Are you sure you want to delete skin type "${skinType.title}"? This action cannot be undone.`
        )
      ) {
        try {
          await deleteSkinType(skinType).unwrap();
        } catch (error: unknown) {
          const errorMessage = getErrorMessage(error);
          alert(`Failed to delete skin type: ${errorMessage}`);
        }
      }
    },
    [skinTypes, deleteSkinType]
  );

  // Export handlers
  const handleExportCategories = useCallback(() => {
    const headers = ["Category ID", "Title", "Description"];
    const csvContent = [
      headers.join(","),
      ...categories.map((category) =>
        [
          category.id,
          `"${category.title}"`,
          `"${category.description || ""}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `categories_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }, [categories]);

  const handleExportBrands = useCallback(() => {
    const headers = ["Brand ID", "Title", "Description"];
    const csvContent = [
      headers.join(","),
      ...brands.map((brand) =>
        [brand.id, `"${brand.title}"`, `"${brand.description || ""}"`].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brands_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }, [brands]);

  const handleExportSkinTypes = useCallback(() => {
    const headers = ["Skin Type ID", "Title", "Description"];
    const csvContent = [
      headers.join(","),
      ...skinTypes.map((skinType) =>
        [
          skinType.id,
          `"${skinType.title}"`,
          `"${skinType.description || ""}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `skin-types_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }, [skinTypes]);

  return {
    // Data
    categories,
    brands,
    skinTypes,
    activeTab,
    setActiveTab,
    isLoading,
    error,

    // Category states
    isCategoryModalOpen,
    editingCategory,

    // Brand states
    isBrandModalOpen,
    editingBrand,

    // Skin Type states
    isSkinTypeModalOpen,
    editingSkinType,

    // Category handlers
    handleAddCategory,
    handleEditCategory,
    handleCloseCategoryModal,
    handleSubmitCategory,
    handleDeleteCategory,

    // Brand handlers
    handleAddBrand,
    handleEditBrand,
    handleCloseBrandModal,
    handleSubmitBrand,
    handleDeleteBrand,

    // Skin Type handlers
    handleAddSkinType,
    handleEditSkinType,
    handleCloseSkinTypeModal,
    handleSubmitSkinType,
    handleDeleteSkinType,

    // Export handlers
    handleExportCategories,
    handleExportBrands,
    handleExportSkinTypes,
  };
};

// Hook quản lý category form
export const useCategoryForm = (editCategory?: CategoryOption | null) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    title: editCategory?.title || "",
    description: editCategory?.description || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback(
    (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [errors]
  );

  const validateForm = (data: CategoryFormData) => {
    const errors: Record<string, string> = {};

    if (!data.title?.trim()) {
      errors.title = "Category title is required";
    }

    if (!data.description?.trim()) {
      errors.description = "Category description is required";
    }

    return errors;
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSubmit: (data: Omit<CategoryOption, "id">) => void
  ) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(formData);
      // Reset form after successful submission
      setFormData({ title: "", description: "" });
    } catch (error) {
      console.error("Error submitting category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  };
};

// Hook quản lý brand form
export const useBrandForm = (editBrand?: BrandOption | null) => {
  const [formData, setBrandFormData] = useState<BrandFormData>({
    title: editBrand?.title || "",
    description: editBrand?.description || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback(
    (field: string, value: string) => {
      setBrandFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [errors]
  );

  const validateForm = (data: BrandFormData) => {
    const errors: Record<string, string> = {};

    if (!data.title?.trim()) {
      errors.title = "Brand title is required";
    }

    if (!data.description?.trim()) {
      errors.description = "Brand description is required";
    }

    return errors;
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSubmit: (data: Omit<BrandOption, "id">) => void
  ) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(formData);
      // Reset form after successful submission
      setBrandFormData({ title: "", description: "" });
    } catch (error) {
      console.error("Error submitting brand:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  };
};

// Hook quản lý skin type form
export const useSkinTypeForm = (editSkinType?: SkinTypeOption | null) => {
  const [formData, setSkinTypeFormData] = useState<SkinTypeFormData>({
    title: editSkinType?.title || "",
    description: editSkinType?.description || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback(
    (field: string, value: string) => {
      setSkinTypeFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [errors]
  );

  const validateForm = (data: SkinTypeFormData) => {
    const errors: Record<string, string> = {};

    if (!data.title?.trim()) {
      errors.title = "Skin type title is required";
    }

    if (!data.description?.trim()) {
      errors.description = "Skin type description is required";
    }

    return errors;
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSubmit: (data: Omit<SkinTypeOption, "id">) => void
  ) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(formData);
      // Reset form after successful submission
      setSkinTypeFormData({ title: "", description: "" });
    } catch (error) {
      console.error("Error submitting skin type:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  };
};

// Utility functions
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const calculateStats = (
  categories: CategoryOption[],
  brands: BrandOption[],
  skinTypes: SkinTypeOption[]
) => {
  return {
    totalCategories: categories.length,
    totalBrands: brands.length,
    totalSkinTypes: skinTypes.length,
    totalItems: categories.length + brands.length + skinTypes.length,
  };
};
