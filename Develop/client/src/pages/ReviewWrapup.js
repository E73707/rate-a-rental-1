import { useEffect, useState } from "react";
import React from "react";
import PartialStar from "./PartialStar";
import Star from "./Star";
import RatingGraph from "./RatingGraph";

const ReviewWrapup = ({ reviews }) => {
  const [averageReview, setAverageReview] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [reviewData, setReviewData] = useState({
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0,
  });

  useEffect(() => {
    if (reviews) {
      let total = 0;
      let newReviewData = {
        oneStar: 0,
        twoStar: 0,
        threeStar: 0,
        fourStar: 0,
        fiveStar: 0,
      };
      for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].rating === 1) {
          newReviewData.oneStar += 1;
        } else if (reviews[i].rating === 2) {
          newReviewData.twoStar += 1;
        } else if (reviews[i].rating === 3) {
          newReviewData.threeStar += 1;
        } else if (reviews[i].rating === 4) {
          newReviewData.fourStar += 1;
        } else {
          newReviewData.fiveStar += 1;
        }
        total += reviews[i].rating;
      }
      setAverageReview(parseFloat((total / reviews.length).toFixed(1)));
      setReviewCount(reviews.length);
      setReviewData(newReviewData);
    }
  }, [reviews]);

  return (
    <div className="review-wrapup-container">
      <div className="review-wrapup-wrapper">
        <div className="review-box">
          <div className="review-box-header">
            <h3 className="review-box-h">Ratings and reviews</h3>
            <div className="review-box-content">
              <div className="average-review">
                <p className="average-review-number">{averageReview}/5</p>
                {Array.from({ length: 5 }, (_, index) => {
                  const isFilledStar = index + 1 <= averageReview;
                  const isPartialStar =
                    index < averageReview && index + 1 > averageReview;
                  const fillPercentage = isPartialStar
                    ? ((averageReview - index) * 100).toFixed(0)
                    : 0;

                  if (isPartialStar) {
                    return (
                      <PartialStar
                        key={index}
                        index={index + 1}
                        fillPercentage={fillPercentage}
                        width={15}
                      />
                    );
                  } else {
                    return (
                      <Star
                        key={index}
                        index={index + 1}
                        rating={isFilledStar ? index + 1 : 0}
                        width={15}
                      />
                    );
                  }
                })}
              </div>
              <RatingGraph reviewData={reviewData} reviewCount={reviewCount} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewWrapup;
