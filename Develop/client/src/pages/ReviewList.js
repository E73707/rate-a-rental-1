import React from "react";
import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews, onReviewRemoved, onReviewUpdated }) => {
  return (
    <div className="review-list-wrapper">
      <div className="review-wrapper">
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            review={review}
            index={index}
            onReviewRemoved={onReviewRemoved}
            onReviewUpdated={onReviewUpdated}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
