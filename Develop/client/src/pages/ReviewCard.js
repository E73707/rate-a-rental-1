import React, { useEffect, useState } from "react";
import { GET_ME } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_REVIEW } from "../utils/mutations";
import EditReviewModal from "./EditReviewModal";

const ReviewCard = ({ review, index, onReviewRemoved, onReviewUpdated }) => {
  const { loading, data } = useQuery(GET_ME);
  const [userData, setUserData] = useState({});
  const [removeReview, { removeError }] = useMutation(REMOVE_REVIEW);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (data) {
      setUserData(data.me);
    }
    if (!data) {
      console.log("No data");
    }
  }, [data]);

  const handleDeleteClick = async (reviewId) => {
    console.log("Trying to delete review with id:", reviewId);
    try {
      await removeReview({
        variables: {
          reviewId,
        },
      });
      console.log("Review removed, calling onReviewRemoved");
      console.log("Calling onReviewRemoved");
      onReviewRemoved(reviewId); // Call the function passed from the parent component
    } catch (error) {
      console.error("Error removing review:", error);
    }
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
  };

  const handleModalSubmit = (updatedReview) => {
    // Handle the form submission here
    console.log(updatedReview);
    setShowEditModal(false);
    // handleModalSubmit(updatedReview); // Pass the updated review data to the parent component
  };

  const convertDate = (date) => {
    if (!review.createdAt.includes(",")) {
      const date = new Date(date);

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      const ddMmYyyyHhMmSs = `${day}/${month}/${year} at ${hours}:${minutes}`;
      return ddMmYyyyHhMmSs;
    }
    return date;
  };

  return (
    <div className="review-card">
      <h3>Review {index + 1}</h3>
      <p>ID: {review.author.id}</p>
      <p>Author: {review.author.username}</p>
      <p>Rating: {review.rating}</p>
      <p>Description: {review.reviewDescription}</p>
      <p>
        {() => {
          convertDate(review.createdAt);
        }}
      </p>
      <p>{review.updatedAt ? `Updated at: ${review.updatedAt}` : ""}</p>
      {userData.id === review.author.id ? (
        <div className="review-card-actions">
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={() => handleDeleteClick(review.id)}>Delete</button>
        </div>
      ) : (
        ""
      )}
      <EditReviewModal
        review={review}
        show={showEditModal}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default ReviewCard;
