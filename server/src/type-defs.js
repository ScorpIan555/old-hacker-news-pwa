const { gql } = require("apollo-server-lambda");

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  type Query {
    hello: String
    allPosts: [Post]
  }

  type User {
    id: ID!
    name: String!
    status: String!
  }

  type Post {
    id: String
    title: String
    votes: Int
    url: String
    createdAt: String
  }

  type _allPostsMeta {
    count: [Post]
  }
`;
