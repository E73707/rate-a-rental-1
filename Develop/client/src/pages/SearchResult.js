import React, { useDeferredValue, useEffect, useState } from "react";
import "../styles/searchResult.css";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROPERTY } from "../utils/mutations";
import { GET_PROPERTY } from "../utils/queries";
import Modal from "./reviewModal";

const SearchResult = ({ address }) => {
  const [addProperty, { addError }] = useMutation(ADD_PROPERTY);
  const { loading, data } = useQuery(GET_PROPERTY, { variables: { address } });
  const [propertyData, setPropertyData] = useState("");

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (data.property) {
      console.log(data);
      console.log(`This address has already been added to the database!`);
      setPropertyData(data);
    } else {
      console.log(`The address ${address} has been added to the database`);
      addProperty({ variables: { address } });
    }
  }, [loading, data]);

  const hasReviews =
    propertyData &&
    propertyData.property &&
    propertyData.property.reviews &&
    propertyData.property.reviews.length > 0;

  return (
    <div>
      <h1>SEARCH RESULT: {address}</h1>
      {!hasReviews ? (
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
          <Modal open={openModal} onClose={() => setOpenModal(false)} />
          {}
        </div>
      ) : (
        <p>This Property has reviews</p>
      )}
    </div>
  );
};

export default SearchResult;
