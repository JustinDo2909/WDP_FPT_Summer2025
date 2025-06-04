"use client";

import type React from "react";

import { useState } from "react";
import type {
  Category,
  Brand,
} from "@/constants/manage-categories-brands/index";
import {
  sampleCategories,
  sampleBrands,
} from "@/constants/manage-categories-brands/index";

import { sampleProducts } from "@/constants/manage-products/index";

export interface CategoryFormData {
  name: string;
  value: string;
  description: string;
}

export interface BrandFormData {
  name: string;
  country: string;
  description: string;
}

// Hook quản lý categories và brands
export const useCategoriesBrandsLogic = () => {
  const [categories, setCategories] = useState<Category[]>(sampleCategories);
  const [brands, setBrands] = useState<Brand[]>(sampleBrands);
  const [activeTab, setActiveTab] = useState<"categories" | "brands">(
    "categories"
  );

  // Category states
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Brand states
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  // Category handlers
  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsCategoryModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };

  const handleSubmitCategory = (categoryData: Category) => {
    if (editingCategory) {
      // Update existing category
      setCategories((prev) =>
        prev.map((category) =>
          category.id === categoryData.id ? categoryData : category
        )
      );
    } else {
      // Add new category
      setCategories((prev) => [...prev, categoryData]);
    }
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return;

    // Check if category has products
    const productsInCategory = sampleProducts.filter(
      (product) => product.category === category.name
    );

    if (productsInCategory.length > 0) {
      alert(
        `Cannot delete category "${category.name}" because it has ${productsInCategory.length} product(s). Please remove all products from this category first.`
      );
      return;
    }

    if (
      confirm(
        `Are you sure you want to delete category "${category.name}"? This action cannot be undone.`
      )
    ) {
      setCategories((prev) =>
        prev.filter((category) => category.id !== categoryId)
      );
    }
  };

  // Brand handlers
  const handleAddBrand = () => {
    setEditingBrand(null);
    setIsBrandModalOpen(true);
  };

  const handleEditBrand = (brand: Brand) => {
    setEditingBrand(brand);
    setIsBrandModalOpen(true);
  };

  const handleCloseBrandModal = () => {
    setIsBrandModalOpen(false);
    setEditingBrand(null);
  };

  const handleSubmitBrand = (brandData: Brand) => {
    if (editingBrand) {
      // Update existing brand
      setBrands((prev) =>
        prev.map((brand) => (brand.id === brandData.id ? brandData : brand))
      );
    } else {
      // Add new brand
      setBrands((prev) => [...prev, brandData]);
    }
    setIsBrandModalOpen(false);
    setEditingBrand(null);
  };

  const handleDeleteBrand = (brandId: string) => {
    const brand = brands.find((b) => b.id === brandId);
    if (!brand) return;

    // Check if brand has products
    const productsWithBrand = sampleProducts.filter(
      (product) => product.brand === brand.name
    );

    if (productsWithBrand.length > 0) {
      alert(
        `Cannot delete brand "${brand.name}" because it has ${productsWithBrand.length} product(s). Please remove all products from this brand first.`
      );
      return;
    }

    if (
      confirm(
        `Are you sure you want to delete brand "${brand.name}"? This action cannot be undone.`
      )
    ) {
      setBrands((prev) => prev.filter((brand) => brand.id !== brandId));
    }
  };

  // Export handlers
  const handleExportCategories = () => {
    const headers = [
      "Category ID",
      "Name",
      "Product Count",
      "Description",
      "Created Date",
      "Updated Date",
    ];
    const csvContent = [
      headers.join(","),
      ...categories.map((category) =>
        [
          category.id,
          `"${category.name}"`,
          category.value,
          `"${category.description || ""}"`,
          new Date(category.createdDate).toLocaleDateString(),
          new Date(category.updatedDate).toLocaleDateString(),
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
  };

  const handleExportBrands = () => {
    const headers = [
      "Brand ID",
      "Name",
      "Country",
      "Product Count",
      "Description",
      "Created Date",
      "Updated Date",
    ];
    const csvContent = [
      headers.join(","),
      ...brands.map((brand) =>
        [
          brand.id,
          `"${brand.name}"`,
          brand.country,
          brand.productCount,
          `"${brand.description || ""}"`,
          new Date(brand.createdDate).toLocaleDateString(),
          new Date(brand.updatedDate).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brands_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return {
    // Data
    categories,
    brands,
    activeTab,
    setActiveTab,

    // Category states
    selectedCategory,
    isCategoryModalOpen,
    editingCategory,

    // Brand states
    selectedBrand,
    isBrandModalOpen,
    editingBrand,

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

    // Export handlers
    handleExportCategories,
    handleExportBrands,
  };
};

// Hook quản lý category form
export const useCategoryForm = (editCategory?: Category | null) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: editCategory?.name || "",
    value: editCategory?.value?.toString() || "0",
    description: editCategory?.description || "",
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (data: CategoryFormData) => {
    const errors: any = {};

    if (!data.name?.trim()) {
      errors.name = "Category name is required";
    }

    if (data.value && isNaN(Number(data.value))) {
      errors.value = "Product count must be a number";
    }

    if (data.value && Number(data.value) < 0) {
      errors.value = "Product count cannot be negative";
    }

    return errors;
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSubmit: (data: Category) => void
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

    const categoryData: Category = {
      ...formData,
      id:
        editCategory?.id ||
        `CAT-${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(3, "0")}`,
      value: Number.parseInt(formData.value) || 0,
      createdDate: editCategory?.createdDate || new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };

    try {
      await onSubmit(categoryData);
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
export const useBrandForm = (editBrand?: Brand | null) => {
  const [formData, setBrandFormData] = useState<BrandFormData>({
    name: editBrand?.name || "",
    country: editBrand?.country || "",
    description: editBrand?.description || "",
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setBrandFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (data: BrandFormData) => {
    const errors: any = {};

    if (!data.name?.trim()) {
      errors.name = "Brand name is required";
    }

    if (!data.country?.trim()) {
      errors.country = "Country is required";
    }

    return errors;
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSubmit: (data: Brand) => void
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

    const brandData: Brand = {
      ...formData,
      id:
        editBrand?.id ||
        `BRD-${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(3, "0")}`,
      productCount: editBrand?.productCount || 0,
      createdDate: editBrand?.createdDate || new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };

    try {
      await onSubmit(brandData);
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

// Utility functions
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const calculateCategoryStats = (categories: Category[]) => {
  const totalCategories = categories.length;
  const totalProducts = categories.reduce(
    (sum, category) => sum + category.value,
    0
  );
  const averageProductsPerCategory =
    totalCategories > 0 ? totalProducts / totalCategories : 0;
  const mostPopularCategory = categories.reduce(
    (max, category) => (category.value > max.value ? category : max),
    categories[0] || { value: 0, name: "None" }
  );

  return {
    totalCategories,
    totalProducts,
    averageProductsPerCategory,
    mostPopularCategory,
  };
};

export const calculateBrandStats = (brands: Brand[]) => {
  const totalBrands = brands.length;
  const totalProducts = brands.reduce(
    (sum, brand) => sum + brand.productCount,
    0
  );
  const averageProductsPerBrand =
    totalBrands > 0 ? totalProducts / totalBrands : 0;

  const countryCounts = brands.reduce(
    (acc, brand) => {
      acc[brand.country] = (acc[brand.country] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const topCountry = Object.entries(countryCounts).reduce(
    (max, [country, count]) => (count > max.count ? { country, count } : max),
    { country: "None", count: 0 }
  );

  return {
    totalBrands,
    totalProducts,
    averageProductsPerBrand,
    topCountry,
    countryCounts,
  };
};
