'use client'

// import { useUser } from "@/hooks/useUser";
import { useLazyGetReviewsByIdQuery, usePostReviewMutation } from "@/process/api/api";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export function useProductReviews(productId: string) {
  const [trigger, { data: reviewsData, isLoading: reviewsLoading }] = useLazyGetReviewsByIdQuery();
  const [postReview, { isLoading: postingReview }] = usePostReviewMutation();
  const [reviewText, setReviewText] = useState("");
  const [reviewValue, setReviewValue] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  // const {user} = useUser()

  useEffect(() => {
    if (productId) {
      trigger(productId);
    }
  }, [productId, trigger]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postReview({
        productId: productId,
        reviewValue: reviewValue,
        reviewMessage: reviewText,
      });
      setReviewText("");
      setReviewValue(5);
      setSubmitted(true);
      trigger(productId);
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit review");
    }
  };

  return {
    reviewsData,
    reviewsLoading,
    postingReview,
    reviewText,
    setReviewText,
    reviewValue,
    setReviewValue,
    submitted,
    setSubmitted,
    handleSubmit,
  };
}
