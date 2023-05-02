import React, { useEffect, useState } from "react";
import "../styles/searchResult.css";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROPERTY } from "../utils/mutations";
import { GET_PROPERTY } from "../utils/queries";
import Modal from "./reviewModal";
import ReviewList from "./ReviewList";
import "../styles/reviewPage.css";
import { GET_ME } from "../utils/queries";

const SearchResult = ({ address }) => {
  const [addProperty, { addError }] = useMutation(ADD_PROPERTY);
  const { loading, data } = useQuery(GET_PROPERTY, { variables: { address } });
  const [propertyData, setPropertyData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { loadingME, dataME } = useQuery(GET_ME);
  const [userData, setUserData] = useState({});
  const [propertyReviews, setPropertyReviews] = useState([]);

  useEffect(() => {
    if (
      propertyData &&
      propertyData.property &&
      propertyData.property.reviews
    ) {
      setPropertyReviews(
        [...propertyData.property.reviews].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    }
  }, [propertyData]);

  useEffect(() => {
    const fetchProperty = async () => {
      if (loading) {
        console.log("LOADING");
        return;
      }

      if (!data) {
        console.log("theres no data");
        return;
      }

      console.log("Data received:", data);

      if (data.property) {
        console.log(`This address has already been added to the database!`);
        setPropertyData(data);
      } else {
        console.log(`The address ${address} has been added to the database`);
        const { data: addedPropertyData } = await addProperty({
          variables: { address },
        });
        setPropertyData({ property: addedPropertyData.addProperty });
      }
    };

    fetchProperty();
  }, [loading, data, addProperty, address]);

  const handleReviewSubmit = (review) => {
    console.log("Review Submitted: ", review);
    console.log(propertyData.property.reviews);
    setPropertyReviews([...propertyReviews, review]);
    debugger;
  };

  const handleReviewRemoved = (reviewId) => {
    setPropertyReviews(
      propertyReviews.filter((review) => review.id !== reviewId)
    );
    debugger;
  };

  const hasReviews =
    propertyData &&
    propertyData.property &&
    propertyData.property.reviews &&
    propertyData.property.reviews.length > 0;

  return (
    <div>
      <h1>SEARCH RESULT: {address}</h1>
      {propertyReviews.length === 0 ? (
        <div>
          <p>No reviews available for this address.</p>
          <p>
            If you have experience with this property, please consider adding a
            review.
          </p>
          <button
            onClick={() => setOpenModal(true)}
            className="review-btn"
            type="submit"
            variant="success"
          >
            Submit a review
          </button>
          <Modal
            open={openModal}
            propertyId={
              propertyData && propertyData.property
                ? propertyData.property.id
                : null
            }
            onClose={() => setOpenModal(false)}
            onSubmit={handleReviewSubmit}
          />
          {}
        </div>
      ) : (
        <div>
          <p>This Property has reviews</p>
          <ReviewList
            reviews={propertyReviews}
            onReviewRemoved={handleReviewRemoved}
          />
        </div>
      )}
    </div>
  );
};

export default SearchResult;
