import React, { useState, useEffect } from "react";
import "../styles/modal.css";
import Star from "./Star";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../utils/mutations";
import Auth from "../utils/auth";
import { GET_PROPERTY } from "../utils/queries";

const Modal = ({ open, onClose, onSubmit, propertyId, address }) => {
  const [validated, setValidated] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [addReview] = useMutation(ADD_REVIEW, {
    refetchQueries: [{ query: GET_PROPERTY, variables: { address: address } }],
  });
  const [formData, setFormData] = useState(() => ({
    propertyId: "",
    reviewDescription: "",
    rating: "",
    title: "",
  }));

  const [formInvalidWarning, setFormInvalidWarning] = useState(false);
  const [loginErrorWarning, setLoginErrorWarning] = useState(false);

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

    let loginErrorWarning = false;
    if (!token) {
      setLoginErrorWarning(true);
      console.log("you need to login");
      loginErrorWarning = true;
    } else {
      setLoginErrorWarning(false);
    }

    if (loginErrorWarning) return;

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
      const { data } = await addReview({
        variables: {
          ...formData,
          propertyId,
          rating: parseInt(formData.rating),
          title: formData.title,
        },
      });
      onSubmit(data.addReview);
      onClose();
    } catch (error) {
      console.error("ERROR ADDING REVIEW:", error);
      console.log("Server response:", error.networkError.result.errors);
      console.log({ ...formData, propertyId, rating });
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
          <h2 className="modal-header">Submit a review</h2>
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
                placeholder="Title"
                name="title"
                onChange={handleInputChange}
                value={formData.title}
                required
              />
              <div className="invalid-feedback"></div>
            </div>
            <div className="description-wrapper">
              <p className="description-wrapper-header">Description</p>
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

            <div className="review-submit-btn-wrapper">
              <button className="review-submit-btn" type="submit">
                Submit
              </button>
            </div>
            <div className="invalid-form-error">
              {formInvalidWarning && (
                <div className="form-invalid-warning">
                  Please fill in all of the required input fields
                </div>
              )}
            </div>
            <div className="invalid-login-error">
              {loginErrorWarning && (
                <div className="login-invalid-warning">
                  Please login to add a review
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
