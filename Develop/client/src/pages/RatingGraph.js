import React, { useState, useEffect } from "react";
import "../styles/ratingGraph.css";

const RatingGraph = ({ reviewData, reviewCount }) => {
  const [barWidths, setBarWidths] = useState({
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0,
  });

  useEffect(() => {
    let totalReviews =
      reviewData.oneStar +
      reviewData.twoStar +
      reviewData.threeStar +
      reviewData.fourStar +
      reviewData.fiveStar;

    const calculateBarWidths = () => {
      const newBarWidths = {};

      for (const key in reviewData) {
        if (totalReviews === 0) {
          newBarWidths[key] = 0;
        } else {
          newBarWidths[key] = (reviewData[key] / totalReviews) * 100;
        }
      }

      return newBarWidths;
    };

    setBarWidths(calculateBarWidths());
    totalReviews = 0;
  }, [reviewData]);

  return (
    <div className="rating-graph-container">
      {Object.keys(reviewData)
        .reverse()
        .map((key, index) => {
          const starNumber = 5 - index;
          const rating = reviewData[key];
          const barWidth = barWidths[key];

          return (
            <div key={key} className="rating-row">
              <div className="star-number">{starNumber} Star</div>
              <div className="rating-bar-bg">
                <div
                  className="rating-bar-fill"
                  style={{ width: `${barWidth}%` }}
                ></div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default RatingGraph;
