import React, { useState } from "react";
import "../styles/modal.css";
import Star from "./Star";

const Modal = ({ open, onClose, onSubmit }) => {
  const [validated, setValidated] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [formData, setFormData] = useState({ description: "" });
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
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      onSubmit(formData);
    }
    setValidated(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
                name="description"
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
