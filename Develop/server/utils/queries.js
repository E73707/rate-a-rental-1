import { gql } from "@apollo/client";

export const GET_PROPERTY = gql`
  query Query($propertyId: ID!) {
    property(id: $propertyId) {
      address
      id
      reviews {
        author {
          username
          id
        }
        comment
        id
        rating
      }
      issues {
        description
        id
        issueImage
        reportedBy {
          id
          username
        }
        status
        landlordResponse {
          images
          message
          status
        }
      }
    }
  }
`;
