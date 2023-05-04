import { gql } from "@apollo/client";

export const GET_PROPERTY = gql`
  query GetProperty($address: String!) {
    property(address: $address) {
      address
      id
      reviews {
        id
        author {
          username
          id
        }
        title
        rating
        reviewDescription
        createdAt
        updatedAt
        comments {
          commentText
          createdAt
        }
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
