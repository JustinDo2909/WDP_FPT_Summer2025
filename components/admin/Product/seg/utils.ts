"use client";

import type React from "react";

import { useState } from "react";
import { sampleProducts } from "@/constants/manage-products/index";
import { Product, ProductFormData } from "@/types/productManagement/index";

// Hook quản lý state của products
export const useProductsLogic = () => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  };

  const handleSubmitProduct = (productData: Product) => {
    if (editingProduct) {
      // Update existing product
      setProducts((prev) =>
        prev.map((product) =>
          product.id === productData.id ? productData : product
        )
      );
    } else {
      // Add new product
      setProducts((prev) => [...prev, productData]);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return {
    products,
    isModalOpen,
    editingProduct,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleSubmitProduct,
    handleCloseModal,
  };
};

// Hook quản lý search và filter
export const useProductSearch = (products: Product[]) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    searchTerm,
    setSearchTerm,
    filteredProducts,
  };
};

// Hook quản lý form modal
export const useProductForm = (editProduct?: Product | null) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: editProduct?.name || "",
    description: editProduct?.description || "",
    price: editProduct?.price?.toString() || "",
    brand: editProduct?.brand || "",
    category: editProduct?.category || "",
    stock: editProduct?.stock?.toString() || "",
    discount: editProduct?.discount || 0,
    images: editProduct?.images || [],
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = handleImageUpload(files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index),
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      stock: "",
      discount: 0,
      images: [],
    });
    setErrors({});
    setIsSubmitting(false);
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSubmit: (data: Product) => void
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = validateProductForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    const productData: Product = {
      ...formData,
      id: editProduct?.id || generateProductId(),
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
      discount: Number.parseInt(formData.discount.toString()) || 0,
    };

    try {
      await onSubmit(productData);
      resetForm();
    } catch (error) {
      console.error("Error submitting product:", error);
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

// Utility functions
export const generateProductId = () => {
  return Math.floor(Math.random() * 900000) + 100000;
};

export const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`;
};

export const calculateDiscountedPrice = (price: number, discount: number) => {
  if (discount > 0) {
    return price - (price * discount) / 100;
  }
  return price;
};

export const validateProductForm = (formData: ProductFormData) => {
  const errors: any = {};

  if (!formData.name?.trim()) {
    errors.name = "Product name is required";
  }

  if (!formData.description?.trim()) {
    errors.description = "Description is required";
  }

  if (!formData.price || Number.parseFloat(formData.price) <= 0) {
    errors.price = "Valid price is required";
  }

  if (!formData.brand) {
    errors.brand = "Brand selection is required";
  }

  if (!formData.category) {
    errors.category = "Category selection is required";
  }

  if (!formData.stock || Number.parseInt(formData.stock) < 0) {
    errors.stock = "Valid stock quantity is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const handleImageUpload = (files: FileList | null) => {
  if (!files) return [];

  const imageUrls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.type.startsWith("image/")) {
      // In a real app, you would upload to a server and get back URLs
      const url = URL.createObjectURL(file);
      imageUrls.push(url);
    }
  }

  return imageUrls;
};

// Statistics calculations
export const calculateProductStats = (products: Product[]) => {
  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.stock < 50).length;
  const totalCategories = new Set(products.map((p) => p.category)).size;
  const totalBrands = new Set(products.map((p) => p.brand)).size;

  return {
    totalProducts,
    lowStockProducts,
    totalCategories,
    totalBrands,
  };
};
