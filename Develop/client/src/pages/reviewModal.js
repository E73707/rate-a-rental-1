import React, { useState, useEffect } from "react";
import "../styles/modal.css";
import Star from "./Star";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../utils/mutations";
import Auth from "../utils/auth";

const Modal = ({ open, onClose, onSubmit, propertyId }) => {
  const [validated, setValidated] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [addReview, { error, data }] = useMutation(ADD_REVIEW);
  const [formData, setFormData] = useState(() => ({
    propertyId: "",
    reviewDescription: "",
    rating: "",
  }));

  useEffect(() => {
    setFormData({ ...formData, propertyId: propertyId });
  }, [propertyId]);

  if (!open) return null;

  const handleStarClick = (index) => {
    setRating(index);
    setFormData({ ...formData, rating: index });
  };
  const handleStarHover = (index) => {
    setHoverRating(index);
  };

  const handleStarMouseLeave = () => {
    setHoverRating(0);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      console.log("you need to login");
      return false;
    }

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const { data } = await addReview({
          variables: {
            ...formData,
            propertyId,
            rating: parseInt(formData.rating),
          },
        });
        onSubmit(data.addReview);
        onClose();
      } catch (error) {
        console.error("ERROR ADDING REVIEW:", error);
        console.log("Server response:", error.networkError.result.errors);
        console.log({ ...formData, propertyId, rating });
      }
    }
    setValidated(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, propertyId, [name]: value });
  };

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="modalContainer">
        <div className="close-container" onClick={onClose}>
          <div className="leftright"></div>
          <div className="rightleft"></div>
        </div>

        <div className="top-component">
          <h2>Submit a review</h2>
        </div>
        <div className="content">
          <form className="review-form" noValidate onSubmit={handleFormSubmit}>
            <div className="description-wrapper">
              <label htmlFor="Description"></label>
              <textarea
                rows={5}
                placeholder="Description"
                name="reviewDescription"
                onChange={handleInputChange}
                value={formData.description}
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

export default Modal;
