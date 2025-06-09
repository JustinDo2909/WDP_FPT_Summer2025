"use client";

import { X, Tag, FileText } from "lucide-react";
import { useEffect } from "react";
import { Area, RText, Yard, Core, Container } from "@/lib/by/Div";
import { useCategoryForm } from "@/components/admin/Category-Brand/seg/utils";
import type {
  AddCategoryModalProps,
  CategoryOption,
} from "@/types/category-brand/index";

export function AddCategoryModal({
  isOpen,
  onClose,
  onSubmit,
  editCategory,
}: AddCategoryModalProps) {
  const { formData, errors, isSubmitting, handleInputChange, handleSubmit } =
    useCategoryForm(editCategory);

  // Reset form when editCategory changes
  useEffect(() => {
    if (editCategory) {
      handleInputChange("title", editCategory.title);
      handleInputChange("description", editCategory.description);
    }
  }, [editCategory, handleInputChange]);

  const debugSubmit = async (categoryData: Omit<CategoryOption, "id">) => {
    // eslint-disable-next-line no-console
    console.log("Form submission data:", categoryData);
    try {
      await onSubmit(categoryData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Modal caught error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <Core
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-[9998] ${
          isOpen ? "bg-opacity-60" : "bg-opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <Core
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl z-[9999] ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } transition-all duration-300`}
      >
        <Container>
          {/* Header */}
          <Area className="flex items-center justify-between p-6 border-b border-gray-200">
            <Yard>
              <RText className="text-lg font-semibold text-gray-900">
                {editCategory ? "Edit Category" : "Add New Category"}
              </RText>
              <RText className="text-sm text-gray-500">
                {editCategory
                  ? "Update category information"
                  : "Create a new product category"}
              </RText>
            </Yard>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </Area>

          {/* Form */}
          <form
            onSubmit={(e) => handleSubmit(e, debugSubmit)}
            className="p-6 space-y-4"
          >
            {/* Category Name */}
            <Yard>
              <RText className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <Tag className="w-4 h-4" />
                Category Title *
              </RText>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter category title"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && (
                <RText className="text-red-500 text-sm mt-1">
                  {errors.title}
                </RText>
              )}
            </Yard>

            {/* Description */}
            <Yard>
              <RText className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <FileText className="w-4 h-4" />
                Description *
              </RText>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Enter category description"
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && (
                <RText className="text-red-500 text-sm mt-1">
                  {errors.description}
                </RText>
              )}
              <RText className="text-xs text-gray-500 mt-1">
                Brief description of this category
              </RText>
            </Yard>

            {/* Actions */}
            <Area className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting
                  ? "Saving..."
                  : editCategory
                    ? "Update Category"
                    : "Add Category"}
              </button>
            </Area>
          </form>
        </Container>
      </Core>
    </>
  );
}
