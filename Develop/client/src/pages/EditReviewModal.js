import React, { useEffect, useState } from "react";
import Star from "./Star";
import { ADD_REVIEW } from "../utils/mutations";
import { EDIT_REVIEW } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const EditReviewModal = ({ review, show, onClose, onSubmit }) => {
  const [editReview, { error }] = useMutation(EDIT_REVIEW);
  const [formData, setFormData] = useState({
    reviewDescription: review.reviewDescription,
    reviewId: review.id,
    rating: review.rating,
  });

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setFormData({
      reviewDescription: review.reviewDescription,
      reviewId: review.id,
    });
  }, [review]);

  const handleInputChange = (event) => {
    console.log("input changed");
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await editReview({
        variables: {
          ...formData,
        },
      });
      console.log(data);
      onSubmit(data.editReview);
    } catch (error) {
      console.error("ERROR EDITING REVIEW: ", error);
      console.log("Server response:", error.networkError.result.errors);
    }
    console.log(formData);
    onClose();
  };

  const handleStarHover = (index) => {
    setHoverRating(index);
  };

  const handleStarMouseLeave = () => {
    setHoverRating(0);
  };

  const handleStarClick = (index) => {
    setRating(index);
    setFormData({ ...formData, rating: index });
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="modalContainer">
        <div className="close-container" onClick={onClose}>
          <div className="leftright"></div>
          <div className="rightleft"></div>
        </div>

        <div className="top-component">
          <h2>Edit a review</h2>
        </div>
        <div className="content">
          <form className="review-form" noValidate onSubmit={handleFormSubmit}>
            <div className="description-wrapper">
              <label htmlFor="Description"></label>
              <textarea
                rows={5}
                placeholder={review.reviewDescription}
                name="reviewDescription"
                onChange={handleInputChange}
                value={formData.reviewDescription}
                required
              ></textarea>
              <div className="invalid-feedback"></div>
            </div>
            <div className="star-wrapper">
              {[1, 2, 3, 4, 5].map((index) => (
                <Star
                  key={index}
                  index={index}
                  rating={rating}
                  hoverRating={hoverRating}
                  onMouseEnter={() => handleStarHover(index)}
                  onMouseLeave={handleStarMouseLeave}
                  onClick={() => handleStarClick(index)}
                />
              ))}
            </div>
            <div className="review-submit-btn-wrapper">
              <button className="review-submit-btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditReviewModal;
