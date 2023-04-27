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
  type Review {
    id: ID!
    rating: Int!
    comment: String
    author: User!
    property: Property!
  }

  type LandlordResponse {
    status: IssueStatus!
    images: [String]
    message: String
  }

  type Auth {
    token: ID!
    user: User
  }

  enum IssueStatus {
    OPEN
    IN_PROGRESS
    RESOLVED
  }
  type Query {
    property(id: ID!): Property
    issue(id: ID!): Issue
    review(id: ID!): Review
    me: User
    users: [User]
    user(username: String!): User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;
module.exports = typeDefs;
