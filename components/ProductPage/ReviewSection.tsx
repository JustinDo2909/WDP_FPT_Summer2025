"use client";
import { IReview } from "@/types";
import { useProductReviews } from "./seg/review";
import { Star } from "lucide-react";
import { useState } from "react";
import { Row } from "@/lib/by/Div";
import { useUser } from "@/hooks/useUser";

export default function ReviewSection({ productId }: { productId: string }) {
  const [hoverValue, setHoverValue] = useState(5);
  const {
    reviewsData,
    reviewsLoading,
    postingReview,
    reviewText,
    setReviewText,
    reviewValue,
    setReviewValue,
    submitted,
    handleSubmit,
  } = useProductReviews(productId);

  const { user } = useUser();

  // Check if the user has already reviewed the product
  const hasReviewed = reviewsData?.reviews.some(
    (review: IReview) => review.user_id === user?.id
  );

  return (
    <section className="w-full p-4 mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
        <h3 className="font-semibold text-lg">Leave a Review</h3>
        <Row className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setReviewValue(val)}
              onMouseEnter={() => setHoverValue(val)}
              onMouseLeave={() => setHoverValue(reviewValue)}
              className="p-0 bg-transparent border-none outline-none"
              aria-label={`Rate ${val} star${val > 1 ? "s" : ""}`}
              disabled={hasReviewed || reviewsLoading} // Disable star buttons if user has reviewed
            >
              <Star
                size={24}
                fill={
                  (
                    typeof hoverValue !== "undefined"
                      ? val <= hoverValue
                      : val <= reviewValue
                  )
                    ? "#facc15"
                    : "none"
                }
                stroke="#facc15"
                className={`transition ${
                  (
                    typeof hoverValue !== "undefined"
                      ? val <= hoverValue
                      : val <= reviewValue
                  )
                    ? ""
                    : "opacity-60"
                }`}
              />
            </button>
          ))}
        </Row>
        <div className="relative">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className={`border rounded px-3 py-2 min-h-[100px] resize-y focus:outline-none focus:ring focus:ring-pink-300 transition w-full ${
              hasReviewed ? "opacity-50 cursor-not-allowed" : ""
            }`}
            placeholder="Write your review..."
            required
            disabled={hasReviewed || reviewsLoading} // Disable textarea if user has reviewed
          />
          {hasReviewed && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 rounded">
              <span className="bg-pink-500 text-white px-4 py-2 rounded-full font-medium">
                You already reviewed this product
              </span>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={postingReview || hasReviewed} // Disable submit button if user has reviewed
          className={`px-4 py-2 rounded font-medium transition w-fit ${
            postingReview || hasReviewed
              ? "bg-pink-300 text-white cursor-not-allowed"
              : "bg-pink-500 hover:bg-pink-600 text-white"
          }`}
        >
          {postingReview ? "Submitting..." : "Submit Review"}
        </button>
        {submitted && !hasReviewed && (
          <span className="text-green-600 text-sm">
            Thank you! Your review has been submitted.
          </span>
        )}
      </form>

      <Row className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Customer Reviews</h2>
        {reviewsLoading ? (
          <p className="text-gray-500 animate-pulse">Loading reviews...</p>
        ) : Array.isArray(reviewsData?.reviews) &&
          reviewsData.reviews.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {reviewsData.reviews.map((review: IReview) => (
              <li
                key={review.id}
                className="flex items-start gap-3 border-b pb-3"
              >
                <Row className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {review.user_name?.charAt(0).toUpperCase() ?? "U"}
                </Row>
                <Row className="flex-1">
                  <Row className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">
                      {review.user_name}
                    </span>
                    <span className="flex items-center text-yellow-500 text-sm">
                      {Array.from({ length: review.review_value }, (_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill="#facc15"
                          className="mr-0.5"
                        />
                      ))}
                    </span>
                  </Row>
                  <p className="text-gray-700 mt-1">{review.review_message}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </Row>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">
            No reviews yet. Be the first to leave one!
          </p>
        )}
      </Row>
    </section>
  );
}