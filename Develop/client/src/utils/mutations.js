import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
      admin {
        id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const ADD_PROPERTY = gql`
  mutation addProperty($address: String!) {
    addProperty(address: $address) {
      address
      id
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview(
    $rating: Int!
    $propertyId: ID!
    $reviewDescription: String!
    $title: String!
  ) {
    addReview(
      rating: $rating
      propertyId: $propertyId
      reviewDescription: $reviewDescription
      title: $title
    ) {
      propertyId
      author {
        id
        username
      }
      title
      reviewDescription
      rating
      id
      updatedAt
      createdAt
    }
  }
`;

export const REMOVE_REVIEW = gql`
  mutation removeReview($reviewId: ID!) {
    removeReview(reviewId: $reviewId) {
      id
      propertyId
      title
      rating
      reviewDescription
      createdAt
      updatedAt
    }
  }
`;

export const EDIT_REVIEW = gql`
  mutation editReview(
    $reviewId: ID!
    $rating: Int
    $title: String
    $reviewDescription: String
  ) {
    editReview(
      reviewId: $reviewId
      rating: $rating
      title: $title
      reviewDescription: $reviewDescription
    ) {
      id
      rating
      title
      propertyId
      reviewDescription
      updatedAt
    }
  }
`;

export const ADD_AUTHORISE_QUEUE = gql`
  mutation addAuthoriseQueue(
    $fullName: String!
    $email: String!
    $phone: String!
    $file: String!
    $userId: String!
    $propertyId: String!
  ) {
    addAuthoriseQueue(
      fullName: $fullName
      email: $email
      phone: $phone
      file: $file
      userId: $userId
      propertyId: $propertyId
    ) {
      dateOfSubmission
      file
      email
      fullName
      phone
      propertyId
      userId
    }
  }
`;
