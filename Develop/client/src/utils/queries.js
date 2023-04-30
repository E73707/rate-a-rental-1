import { gql } from "@apollo/client";

export const GET_PROPERTY = gql`
  query GetProperty($address: String!) {
    property(address: $address) {
      address
      id
      issues {
        description
        id
        issueImage
        landlordResponse {
          images
          message
          status
        }
        reportedBy {
          id
          username
        }
        status
      }
      reviews {
        author {
          id
          username
        }
        id
        comment
        rating
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
