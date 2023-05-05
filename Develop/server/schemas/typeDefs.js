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
    todos: Todo
    email: String!
  }
  type Property {
    id: ID!
    address: String!
    reviews: [Review]
    issues: [Issue]
  }
  type Issue {
    id: ID!
    description: String!
    reportedBy: User!
    property: Property!
    status: IssueStatus!
    issueImage: String
    landlordResponse: LandlordResponse
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
    status: IssueStatus!
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
  type Todo {
    id: ID!
    authoriseQueue: [AuthoriseQueue!]!
    todoList: [String!]!
  }
  type Query {
    property(address: String!): Property
    issue(id: ID!): Issue
    me: User
    users: [User]
    user(username: String!): User
    review(reviewId: ID!): Review
    getCurrentAdmin: Admin
    todos: Todo
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
  }
`;
module.exports = typeDefs;
