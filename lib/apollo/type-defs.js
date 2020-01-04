import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    status: String!
  }

  type Query {
    viewer: User
    allPosts: [Post]
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
