"use client";

import type React from "react";

import { useState } from "react";
import { Upload, Search, Trash2, Eye, ImageIcon } from "lucide-react";
import { Area, RText, Yard, Container } from "@/lib/by/Div";
import {
  useImageManagement,
  formatDate,
} from "@/components/admin/Quiz/seg/utils";

interface ImageGalleryProps {
  onSelectImage?: (imageUrl: string) => void;
  selectionMode?: boolean;
}

export function ImageGallery({
  onSelectImage,
  selectionMode = false,
}: ImageGalleryProps) {
  const {
    images,
    filteredImages,
    selectedImage,
    isUploadModalOpen,
    isDeleteModalOpen,
    searchTerm,
    setSearchTerm,
    handleUploadImage,
    handleDeleteImage,
    confirmDeleteImage,
    handleSubmitImage,
    setIsUploadModalOpen,
    setIsDeleteModalOpen,
  } = useImageManagement();

  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleImageClick = (imageUrl: string) => {
    if (selectionMode && onSelectImage) {
      onSelectImage(imageUrl);
    } else {
      setSelectedImageUrl(imageUrl);
      setIsPreviewOpen(true);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const url = formData.get("url") as string;

    if (name && url) {
      handleSubmitImage({
        id: "",
        name,
        url,
        uploadedAt: "",
        usedCount: 0,
      });
    }
  };

  return (
    <Container className="space-y-6">
      {/* Header */}
      <Area className="flex justify-between items-center">
        <Yard>
          <RText className="text-2xl font-bold text-gray-900">
            Image Gallery
          </RText>
          <RText className="text-gray-600">
            {selectionMode
              ? "Select an image for your question"
              : "Manage your quiz images"}
          </RText>
        </Yard>
        {!selectionMode && (
          <button
            onClick={handleUploadImage}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Image
          </button>
        )}
      </Area>

      {/* Search */}
      <Yard className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search images..."
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        />
      </Yard>

      {/* Image Grid */}
      <Area className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.length === 0 ? (
          <Container className="col-span-full text-center py-12">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <RText className="text-gray-500">
              {searchTerm
                ? "No images found matching your search."
                : "No images uploaded yet."}
            </RText>
          </Container>
        ) : (
          filteredImages.map((image) => (
            <Container
              key={image.id}
              className={`group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${
                selectionMode ? "cursor-pointer" : ""
              }`}
            >
              {/* Image */}
              <Yard
                className="aspect-square overflow-hidden"
                onClick={() => handleImageClick(image.url)}
              >
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/placeholder.svg?height=200&width=200&text=Image+Error";
                  }}
                />
              </Yard>

              {/* Image Info */}
              <Container className="p-3">
                <RText
                  className="font-medium text-gray-900 truncate"
                  title={image.name}
                >
                  {image.name}
                </RText>
                <Area className="flex justify-between items-center mt-1">
                  <RText className="text-xs text-gray-500">
                    Used {image.usedCount} times
                  </RText>
                  <RText className="text-xs text-gray-500">
                    {formatDate(image.uploadedAt)}
                  </RText>
                </Area>
              </Container>

              {/* Actions */}
              {!selectionMode && (
                <Container className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Area className="flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageUrl(image.url);
                        setIsPreviewOpen(true);
                      }}
                      className="p-1 bg-white bg-opacity-90 text-gray-700 rounded hover:bg-opacity-100 transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteImage(image.id);
                      }}
                      className="p-1 bg-white bg-opacity-90 text-red-600 rounded hover:bg-opacity-100 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </Area>
                </Container>
              )}

              {/* Selection Indicator */}
              {selectionMode && (
                <Container className="absolute inset-0 bg-purple-600 bg-opacity-0 hover:bg-opacity-10 transition-colors flex items-center justify-center">
                  <Yard className="opacity-0 group-hover:opacity-100 transition-opacity bg-white bg-opacity-90 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                    Select
                  </Yard>
                </Container>
              )}
            </Container>
          ))
        )}
      </Area>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <Container className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Container className="bg-white rounded-lg p-6 w-full max-w-md">
            <RText className="text-lg font-semibold text-gray-900 mb-4">
              Upload New Image
            </RText>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <Yard>
                <RText className="block text-sm font-medium text-gray-700 mb-2">
                  Image Name
                </RText>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter image name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </Yard>

              <Yard>
                <RText className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </RText>
                <input
                  type="url"
                  name="url"
                  required
                  placeholder="Enter image URL..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </Yard>

              <Area className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Upload
                </button>
              </Area>
            </form>
          </Container>
        </Container>
      )}

      {/* Preview Modal */}
      {isPreviewOpen && (
        <Container className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <Container className="bg-white rounded-lg p-4 max-w-4xl max-h-[90vh] overflow-auto">
            <Area className="flex justify-between items-center mb-4">
              <RText className="text-lg font-semibold text-gray-900">
                Image Preview
              </RText>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✕
              </button>
            </Area>

            <img
              src={selectedImageUrl || "/placeholder.svg"}
              alt="Preview"
              className="max-w-full max-h-[70vh] object-contain mx-auto"
              onError={(e) => {
                e.currentTarget.src =
                  "/placeholder.svg?height=400&width=600&text=Image+Error";
              }}
            />
          </Container>
        </Container>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedImage && (
        <Container className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Container className="bg-white rounded-lg p-6 w-full max-w-md">
            <RText className="text-lg font-semibold text-gray-900 mb-4">
              Delete Image
            </RText>
            <RText className="text-gray-600 mb-6">
              Are you sure you want to delete "{selectedImage.name}"? This
              action cannot be undone.
            </RText>

            <Area className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteImage}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </Area>
          </Container>
        </Container>
      )}
    </Container>
  );
}
