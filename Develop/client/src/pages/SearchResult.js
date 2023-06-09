import React, { useEffect, useState } from "react";
import "../styles/searchResult.css";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROPERTY } from "../utils/mutations";
import { GET_PROPERTY } from "../utils/queries";
import Modal from "./reviewModal";
import ReviewList from "./ReviewList";
import "../styles/reviewPage.css";
import { GET_ME } from "../utils/queries";
import ReviewWrapup from "./ReviewWrapup";
import IssueList from "./IssueList";
import IssueModal from "./IssueModal";

const SearchResult = ({ address, handleTabChange }) => {
  const [addProperty, { addError }] = useMutation(ADD_PROPERTY);
  const { loading, data, error } = useQuery(GET_PROPERTY, {
    variables: { address },
  });
  const [propertyData, setPropertyData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openIssueModal, setOpenIssueModal] = useState(false);
  const { loadingME, dataME } = useQuery(GET_ME);
  const [userData, setUserData] = useState({});
  const [propertyReviews, setPropertyReviews] = useState([]);

  console.log(address);

  useEffect(() => {
    if (error) {
      console.error("Error fetching property:", error);
      console.error("Network Error:", error.networkError);
      console.error("GraphQL Errors:", error.graphQLErrors);
    }
  }, [error]);

  console.log("Data received:", data);

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
  };

  const handleReviewRemoved = (reviewId) => {
    setPropertyReviews(
      propertyReviews.filter((review) => review.id !== reviewId)
    );
  };

  const formatAddress = (address) => {
    // Split the address string into an array of components
    const addressComponents = address.split(",");

    // Check the length of the addressComponents array and format accordingly
    if (addressComponents.length >= 6) {
      return (
        `${addressComponents[0]} ${addressComponents[1]}, ` +
        `${addressComponents[2]}, ` +
        `${addressComponents[4]}, ${addressComponents[5]}`
      );
    } else {
      // If the addressComponents array has a different length, you can adjust the formatting as needed
      return address;
    }
  };

  const hasReviews =
    propertyData &&
    propertyData.property &&
    propertyData.property.reviews &&
    propertyData.property.reviews.length > 0;

  return (
    <div className="search-result-container">
      <div className="search-result-wrapper">
        <div className="search-result-heading-wrapper">
          <h2 className="search-result-heading">{formatAddress(address)}</h2>
          <div className="claim-property-button-wrapper">
            {propertyData &&
            propertyData.property &&
            propertyData.property.owner ? (
              <div className="property-owner-wrapper">
                <p className="property-owner-text">
                  This property is owned by:
                </p>
                <p className="property-owner-name">
                  {`${propertyData.property.owner.username}`}
                </p>
              </div>
            ) : (
              <div>
                <p className="claim-property-text">
                  Do you own this property? Consider claiming.
                </p>
                <button
                  onClick={() =>
                    handleTabChange("ClaimPropertyTab", null, propertyData)
                  }
                  className="claim-property-button"
                >
                  Claim property
                </button>
              </div>
            )}
          </div>
        </div>

        {propertyReviews.length === 0 ? (
          <div className="no-reviews-wrapper">
            <h3 className="no-reviews-wrapper-heading">
              Sorry, no reviews listed
            </h3>
            <p className="no-reviews-wrapper-text">
              If you have experience with this property, please consider adding
              a review.
            </p>
            <div className="submit-review-button-wrapper">
              <button
                onClick={() => setOpenModal(true)}
                className="review-btn"
                type="submit"
                variant="success"
              >
                Submit a review
              </button>
              <button
                className="review-btn"
                onClick={() => setOpenIssueModal(true)}
                type="submit"
                variant="success"
              >
                Submit an issue
              </button>
            </div>

            <div className="image-wrapper">
              <img
                className="no-reviews-image"
                src="/images/no-reviews.png"
              ></img>
            </div>

            <Modal
              open={openModal}
              propertyId={
                propertyData && propertyData.property
                  ? propertyData.property.id
                  : null
              }
              address={address}
              onClose={() => setOpenModal(false)}
              onSubmit={handleReviewSubmit}
            />
            <IssueModal
              open={openIssueModal}
              propertyId={
                propertyData && propertyData.property
                  ? propertyData.property.id
                  : null
              }
              address={address}
              onClose={() => setOpenIssueModal(false)}
            />
            {}
          </div>
        ) : (
          <div>
            <div className="RW-container">
              <ReviewWrapup reviews={propertyReviews} />
              <div className="submit-review-button-wrapper">
                <button
                  onClick={() => setOpenModal(true)}
                  className="review-btn"
                  type="submit"
                  variant="success"
                >
                  Submit a review
                </button>
                <button
                  className="review-btn"
                  onClick={() => setOpenIssueModal(true)}
                  type="submit"
                  variant="success"
                >
                  Submit an issue
                </button>
              </div>
              <div className="submit-issue-button-wrapper"></div>
            </div>

            <Modal
              open={openModal}
              propertyId={
                propertyData && propertyData.property
                  ? propertyData.property.id
                  : null
              }
              address={address}
              onClose={() => setOpenModal(false)}
              onSubmit={handleReviewSubmit}
            />
            <IssueModal
              open={openIssueModal}
              propertyId={
                propertyData && propertyData.property
                  ? propertyData.property.id
                  : null
              }
              address={address}
              onClose={() => setOpenIssueModal(false)}
              // onSubmit={}
            />
            <ReviewList
              address={address}
              reviews={propertyReviews}
              onReviewRemoved={handleReviewRemoved}
            />
            <IssueList propertyData={propertyData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
