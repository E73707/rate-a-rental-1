import React, { useEffect, useState } from "react";
import Star from "./Star";
import { ADD_REVIEW } from "../utils/mutations";
import { EDIT_REVIEW } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

const EditReviewModal = ({ review, show, onClose, onSubmit }) => {
  const [editReview, { error }] = useMutation(EDIT_REVIEW);
  const [formData, setFormData] = useState({
    reviewDescription: review.reviewDescription,
    reviewId: review.id,
    rating: review.rating,
    title: review.title,
  });

  const [rating, setRating] = useState(review.rating);
  const [hoverRating, setHoverRating] = useState(0);

  const [formInvalidWarning, setFormInvalidWarning] = useState(false);

  useEffect(() => {
    setFormData({
      reviewDescription: review.reviewDescription,
      reviewId: review.id,
      title: review.title,
    });
    setRating(review.rating);
  }, [review]);

  const handleInputChange = (event) => {
    console.log("input changed");
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      console.log("you need to login");
      return false;
    }

    let formInvalidWarning = false;

    if (
      formData.reviewDescription.trim() === "" ||
      formData.title.trim() === "" ||
      formData.rating === 0
    ) {
      console.log("true");
      setFormInvalidWarning(true);
      formInvalidWarning = true;
    } else {
      console.log("false");
      setFormInvalidWarning(false);
    }

    if (formInvalidWarning) return;

    try {
      const { data } = await editReview({
        variables: {
          ...formData,
        },
      });
      console.log(data);
      onSubmit(data.editReview);
      setFormInvalidWarning(false);
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
          <h2 className="modal-header">Edit a review</h2>
        </div>
        <div className="content">
          <form className="review-form" noValidate onSubmit={handleFormSubmit}>
            <div className="star-wrapper">
              <div className="rating-wrapper">
                <p className="rating-wrapper-title">Overall rating</p>
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
                <p className="rating-wrapper-instruction">Click to rate</p>
              </div>
            </div>
            <div className="title-wrapper">
              <p className="title-wrapper-header">Title</p>
              <input
                type="text"
                placeholder={review.title}
                name="title"
                onChange={handleInputChange}
                value={formData.title}
                required
                className="title-input"
              />
              <div className="invalid-feedback"></div>
            </div>
            <div className="description-wrapper">
              <p className="description-wrapper-header">Description</p>
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

            <div className="review-submit-btn-wrapper">
              <button className="review-submit-btn" type="submit">
                Edit review
              </button>
            </div>
            <div className="invalid-form-error">
              {formInvalidWarning && (
                <div className="form-invalid-warning">
                  Please fill in all of the required input fields
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditReviewModal;
