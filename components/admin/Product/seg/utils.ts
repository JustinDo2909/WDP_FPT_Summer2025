"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Product, ProductFormData } from "@/types/productManagement/index";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/process/api/apiProduct";

// Hook to manage search and filter with API query parameters
export const useProductSearch = () => {
  const [searchParams, setSearchParams] = useState({
    title: "",
    category: "",
    brand: "",
    skinType: "",
  });

  const updateSearchParams = (field: string, value: string) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }));
  };

  return {
    searchParams,
    updateSearchParams,
  };
};

// Hook to manage form modal
export const useProductForm = (editProduct?: Product | null) => {
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    description: "",
    price: "",
    sale_price: "",
    image_url: "",
    total_stock: "",
    product_category_id: "",
    product_brand_id: "",
    product_skinType_id: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when editProduct changes
  useEffect(() => {
    if (editProduct) {
      setFormData({
        title: editProduct.title || "",
        description: editProduct.description || "",
        price: editProduct.price ? editProduct.price.toString() : "",
        sale_price: editProduct.sale_price
          ? editProduct.sale_price.toString()
          : "",
        image_url: editProduct.image_url || "",
        total_stock: editProduct.total_stock
          ? editProduct.total_stock.toString()
          : "",
        product_category_id: editProduct.product_category_id || "",
        product_brand_id: editProduct.product_brand_id || "",
        product_skinType_id: editProduct.product_skinType_id || "",
      });
      setErrors({});
    } else {
      // Reset form for new product
      setFormData({
        title: "",
        description: "",
        price: "",
        sale_price: "",
        image_url: "",
        total_stock: "",
        product_category_id: "",
        product_brand_id: "",
        product_skinType_id: "",
      });
      setErrors({});
    }
  }, [editProduct]);

  const handleInputChange = useCallback(
    (field: keyof ProductFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    },
    []
  );

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        // In a real app, you would upload the image to a server and get back a URL
        // For now, we'll use a placeholder or the first file's URL
        const url = URL.createObjectURL(files[0]);
        handleInputChange("image_url", url);
      }
    },
    [handleInputChange]
  );

  const removeImage = useCallback(() => {
    handleInputChange("image_url", "");
  }, [handleInputChange]);

  const resetForm = useCallback(() => {
    setFormData({
      title: "",
      description: "",
      price: "",
      sale_price: "",
      image_url: "",
      total_stock: "",
      product_category_id: "",
      product_brand_id: "",
      product_skinType_id: "",
    });
    setErrors({});
    setIsSubmitting(false);
  }, []);

  const handleSubmit = async (
    e: React.FormEvent,
    onSubmit: (
      data: Omit<
        Product,
        | "id"
        | "createdAt"
        | "updatedAt"
        | "productCategory"
        | "productBrand"
        | "productSkinType"
      >
    ) => void
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = validateProductForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    const productData = {
      title: formData.title,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      sale_price: formData.sale_price
        ? Number.parseFloat(formData.sale_price)
        : 0,
      image_url: formData.image_url,
      total_stock: Number.parseInt(formData.total_stock),
      product_category_id: formData.product_category_id,
      product_brand_id: formData.product_brand_id,
      product_skinType_id: formData.product_skinType_id,
      rating: editProduct?.rating || 0,
    };

    try {
      await onSubmit(productData);
      resetForm();
    } catch (error) {
      console.error("Error submitting product:", error);
      setErrors({ title: "Failed to submit product. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleImageChange,
    removeImage,
    handleSubmit,
    resetForm,
  };
};

// Hook to manage products logic with API
export const useProductsLogic = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = () => {
    // This will be handled in the table component
  };

  const handleSubmitProduct = async (
    data: Omit<
      Product,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "productCategory"
      | "productBrand"
      | "productSkinType"
    >
  ) => {
    try {
      if (editingProduct) {
        await updateProduct({ id: editingProduct.id, data }).unwrap();
      } else {
        await createProduct(data).unwrap();
      }
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return {
    isModalOpen,
    editingProduct,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleSubmitProduct,
    handleCloseModal,
  };
};

// Calculate product statistics
export const calculateProductStats = (products: Product[]) => {
  return {
    totalProducts: products.length,
    lowStockProducts: products.filter((p) => p.total_stock < 50).length,
    totalCategories: new Set(products.map((p) => p.productCategory.title)).size,
    totalBrands: new Set(products.map((p) => p.productBrand.title)).size,
  };
};

// Utility functions
export const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`;
};

export const calculateDiscountedPrice = (price: number, sale_price: number) => {
  return sale_price > 0 && sale_price < price ? sale_price : price;
};

export const validateProductForm = (formData: ProductFormData) => {
  const errors: Partial<Record<keyof ProductFormData, string>> = {};

  if (!formData.title?.trim()) {
    errors.title = "Product title is required";
  }

  if (!formData.description?.trim()) {
    errors.description = "Description is required";
  }

  if (!formData.price || Number.parseFloat(formData.price) <= 0) {
    errors.price = "Valid price is required";
  }

  if (formData.sale_price && Number.parseFloat(formData.sale_price) < 0) {
    errors.sale_price = "Sale price cannot be negative";
  }

  if (!formData.total_stock || Number.parseInt(formData.total_stock) < 0) {
    errors.total_stock = "Valid stock quantity is required";
  }

  if (!formData.product_category_id) {
    errors.product_category_id = "Category selection is required";
  }

  if (!formData.product_brand_id) {
    errors.product_brand_id = "Brand selection is required";
  }

  if (!formData.product_skinType_id) {
    errors.product_skinType_id = "Skin type selection is required";
  }

  if (!formData.image_url) {
    errors.image_url = "Product image is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
