// graphql.js

const { ApolloServer, gql } = require("apollo-server-lambda");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
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

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!"
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  })
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true
  }
});
