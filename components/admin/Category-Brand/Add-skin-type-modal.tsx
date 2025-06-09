"use client";

import { X, Users, FileText } from "lucide-react";
import { useEffect } from "react";
import { Area, RText, Yard, Core, Container } from "@/lib/by/Div";
import { useSkinTypeForm } from "@/components/admin/Category-Brand/seg/utils";
import type { AddSkinTypeModalProps } from "@/types/category-brand/index";

export function AddSkinTypeModal({
  isOpen,
  onClose,
  onSubmit,
  editSkinType,
}: AddSkinTypeModalProps) {
  const { formData, errors, isSubmitting, handleInputChange, handleSubmit } =
    useSkinTypeForm(editSkinType);

  // Reset form when editSkinType changes
  useEffect(() => {
    if (editSkinType) {
      handleInputChange("title", editSkinType.title);
      handleInputChange("description", editSkinType.description);
    }
  }, [editSkinType, handleInputChange]);

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
                {editSkinType ? "Edit Skin Type" : "Add New Skin Type"}
              </RText>
              <RText className="text-sm text-gray-500">
                {editSkinType
                  ? "Update skin type information"
                  : "Create a new skin type category"}
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
            onSubmit={(e) => handleSubmit(e, onSubmit)}
            className="p-6 space-y-4"
          >
            {/* Skin Type Name */}
            <Yard>
              <RText className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <Users className="w-4 h-4" />
                Skin Type Name *
              </RText>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter skin type name"
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
                placeholder="Enter skin type description"
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
                Brief description of this skin type and its characteristics
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
                  : editSkinType
                    ? "Update Skin Type"
                    : "Add Skin Type"}
              </button>
            </Area>
          </form>
        </Container>
      </Core>
    </>
  );
}
