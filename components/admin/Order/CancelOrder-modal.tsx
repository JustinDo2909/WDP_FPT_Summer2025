"use client";

import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { Area, RText, Yard, Core, Container } from "@/lib/by/Div";
import { toast } from "react-hot-toast";
import clsx from "clsx";
import { UploadDropzone } from "@/lib/uploadthing";

interface CancelOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  onCancel: (orderId: string, reason: string, images: string[]) => void;
}

export function CancelOrderModal({
  isOpen,
  onClose,
  orderId,
  onCancel,
}: CancelOrderModalProps) {
  const [reason, setReason] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reason.trim()) {
      toast.error("Please provide a cancellation reason");
      return;
    }

    console.log("CancelOrderModal handleSubmit - orderId:", orderId);
    console.log(
      "CancelOrderModal handleSubmit - orderId type:",
      typeof orderId,
    );
    console.log("Images to upload:", images);

    setIsSubmitting(true);
    try {
      await onCancel(orderId, reason.trim(), images);
      toast.success("Order cancelled successfully");
      handleClose();
    } catch (error) {
      toast.error("Failed to cancel order");
      console.error("error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setReason("");
    setImages([]);
    setIsSubmitting(false);
    onClose();
  };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files) {
  //     // Convert files to base64 strings (simplified for demo)
  //     // In real app, you'd upload to cloud storage and get URLs
  //     Array.from(files).forEach((file) => {
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         const result = e.target?.result as string;
  //         setImages((prev) => [...prev, result]);
  //       };
  //       reader.readAsDataURL(file);
  //     });
  //   }
  // };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <>
      <Core
        className={clsx(
          "fixed inset-0 bg-black transition-opacity duration-300 z-[9998]",
          isOpen ? "bg-opacity-60" : "bg-opacity-0",
        )}
        onClick={handleClose}
      />

      <Core
        className={clsx(
          "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white shadow-2xl z-[9999] rounded-lg",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95",
        )}
      >
        <Container className="p-6">
          {/* Header */}
          <Area className="flex items-center justify-between mb-6">
            <RText className="text-xl font-semibold text-gray-900">
              Cancel Order
            </RText>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </Area>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Order ID */}
            <Yard>
              <RText className="text-sm font-medium text-gray-700 mb-2">
                Order ID
              </RText>
              <RText className="text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded border">
                {orderId}
              </RText>
            </Yard>

            {/* Reason */}
            <Yard>
              <RText className="text-sm font-medium text-gray-700 mb-2">
                Cancellation Reason <span className="text-red-500">*</span>
              </RText>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please provide a reason for cancellation..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                rows={4}
                required
              />
            </Yard>

            {/* Images */}
            <Yard>
              <RText className="text-sm font-medium text-gray-700 mb-2">
                Supporting Images (Optional)
              </RText>

              {/* Upload Button */}
              {/* <Yard className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <RText className="text-sm text-gray-600">
                    Click to upload images
                  </RText>
                  <RText className="text-xs text-gray-500">
                    PNG, JPG, JPEG up to 5MB each
                  </RText>
                </label>
              </Yard> */}
              <UploadDropzone
                endpoint={"imageUploader"}
                appearance={{
                  label: {
                    color: "#FFFFFF",
                  },
                  allowedContent: {
                    color: "#FFFFFF",
                  },
                  button: {
                    color: "#7878fc",
                  },
                }}
                onClientUploadComplete={(res) => {
                  if (res?.[0]?.url) {
                    setImages((prev) => [...prev, res[0].url]);
                  }
                }}
              />

              {/* Image Preview */}
              {images.length > 0 && (
                <Yard className="mt-4">
                  <RText className="text-sm font-medium text-gray-700 mb-2">
                    Uploaded Images ({images.length})
                  </RText>
                  <Area className="grid grid-cols-2 gap-2">
                    {images.map((image, index) => (
                      <Yard
                        key={index}
                        className="relative group border rounded-lg overflow-hidden"
                      >
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </Yard>
                    ))}
                  </Area>
                </Yard>
              )}
            </Yard>

            {/* Actions */}
            <Area className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !reason.trim()}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Cancelling..." : "Cancel Order"}
              </button>
            </Area>
          </form>
        </Container>
      </Core>
    </>
  );
}
