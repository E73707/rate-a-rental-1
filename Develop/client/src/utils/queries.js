import { gql } from "@apollo/client";

export const GET_PROPERTY = gql`
  query Query($address: String!) {
    property(address: $address) {
      address
      id
      owner {
        id
        username
      }
      reviews {
        author {
          username
          id
        }
        createdAt
        id
        rating
        reviewDescription
        title
      }
      issues {
        description
        id
        issueImage
        landLordResponse {
          images
          message
        }
        propertyId
        reportedBy {
          id
        }
        title
      }
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      email
    }
  }
`;

export const GET_CURRENT_ADMIN = gql`
  query GetCurrentAdmin {
    getCurrentAdmin {
      id
    }
  }
`;

export const GET_AUTHORISE_QUEUE = gql`
  query Query {
    getAuthoriseQueue {
      dateOfSubmission
      email
      file
      fullName
      id
      phone
      propertyId
      userId
    }
  }
`;
