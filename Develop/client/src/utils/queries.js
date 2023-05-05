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

export const GET_CURRENT_ADMIN = gql`
  query GetCurrentAdmin {
    getCurrentAdmin {
      id
    }
  }
`;

export const GET_TODOS = gql`
  query todos {
    todos {
      authoriseQueue {
        dateOfSubmission
        email
        file
        fullName
        id
        phone
        propertyId
        userId
      }
      todoList
    }
  }
`;
