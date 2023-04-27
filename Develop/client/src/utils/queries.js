import { gql } from "@apollo/client";

export const GET_PROPERTY = gql`
  query property($propertyId: ID!) {
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

export const GET_ME = gql`
  query GetMe {
    me {
      _id
      username
      email
    }
  }
`;
