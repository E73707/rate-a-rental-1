const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    reviews: [Review]
    properties: [Property]
  }
  type Admin {
    id: ID!
    username: String!
    password: String!
    email: String!
  }
  type Property {
    id: ID!
    address: String!
    reviews: [Review]
    issues: [Issue]
    owner: User
  }
  type Issue {
    id: ID!
    description: String!
    title: String!
    reportedBy: User!
    propertyId: ID!
    issueImage: String!
    landLordResponse: LandlordResponse
  }

  type Comment {
    commentText: String!
    createdAt: String
  }

  type Review {
    id: String!
    propertyId: ID!
    title: String!
    rating: Int!
    reviewDescription: String
    createdAt: String
    updatedAt: String
    author: User
    comments: [Comment]
  }

  type LandlordResponse {
    images: [String]
    message: String
  }

  input LandlordResponseInput {
    images: [String]
    message: String
  }

  type Auth {
    token: ID!
    user: User
    admin: Admin
  }

  enum IssueStatus {
    OPEN
    IN_PROGRESS
    RESOLVED
  }
  type AuthoriseQueue {
    id: ID!
    fullName: String!
    email: String!
    phone: String!
    file: String!
    userId: String!
    propertyId: String!
    dateOfSubmission: String!
  }

  type Query {
    properties: [Property]
    property(address: String!): Property
    issue(id: ID!): Issue
    me: User
    users: [User]
    user(username: String!): User
    review(reviewId: ID!): Review
    getCurrentAdmin: Admin
    getAuthoriseQueue: [AuthoriseQueue]!
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addAdmin(username: String!, email: String!, password: String!): Auth
    loginAdmin(email: String!, password: String!): Auth
    addProperty(address: String!): Property
    addReview(
      rating: Int!
      title: String!
      reviewDescription: String
      propertyId: ID!
    ): Review
    removeReview(reviewId: ID!): Review
    editReview(
      reviewId: ID!
      rating: Int
      title: String
      reviewDescription: String
    ): Review
    addAuthoriseQueue(
      fullName: String!
      email: String!
      phone: String!
      file: String!
      userId: String!
      propertyId: String!
    ): AuthoriseQueue
    deleteAuthoriseQueue(id: ID!): AuthoriseQueue
    addOwner(propertyId: ID!, userId: ID!): Property
    addIssue(
      propertyId: ID!
      title: String!
      description: String!
      userId: ID!
      issueImage: String!
    ): Issue
    deleteAllIssues: String
    addLandlordResponse(issueId: ID!, response: LandlordResponseInput!): Issue
  }
`;
module.exports = typeDefs;
