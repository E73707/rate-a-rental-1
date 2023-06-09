import React, { useEffect, useState } from "react";
import { GET_ME, GET_PROPERTY } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_REVIEW } from "../utils/mutations";
import EditReviewModal from "./EditReviewModal";
import Star from "./Star";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ReviewCard = ({
  review,
  index,
  onReviewRemoved,
  onReviewUpdated,
  address,
}) => {
  const { loading, data } = useQuery(GET_ME);
  const [userData, setUserData] = useState({});
  const [removeReview] = useMutation(REMOVE_REVIEW, {
    refetchQueries: [{ query: GET_PROPERTY, variables: { address: address } }],
  });
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

  return (
    <div className="review-card">
      <div className="review-card-header">
        <div>
          <div>
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                index={index + 1}
                rating={index < review.rating ? index + 1 : 0}
                width={15}
              />
            ))}
          </div>
        </div>
        <div className="timeStamp">
          <p className="timestamp-title">Added:</p>
          <p className="timestamp-time">{review.createdAt}</p>
        </div>
      </div>
      <div className="review-card-title-wrapper">
        <h4 className="review-card-title">{review.title}</h4>
        <div className="author-username-wrapper">
          <p className="author-username-title">Reviewed by: </p>
          <p className="author-username"> {review.author.username}</p>
        </div>
      </div>

      <p>{review.reviewDescription}</p>

      <div className="bottom-card-row">
        <p>{review.updatedAt ? `Updated at: ${review.updatedAt}` : ""}</p>
        {userData.id === review.author.id ? (
          <div className="review-card-actions">
            <button className="review-card-btn" onClick={handleEditClick}>
              <FontAwesomeIcon icon={faEdit} className="icon" />
              Edit
            </button>
            <button
              className="review-card-btn"
              onClick={() => handleDeleteClick(review.id)}
            >
              <FontAwesomeIcon icon={faTrashAlt} className="icon" />
              Delete
            </button>
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
    </div>
  );
};

export default ReviewCard;
