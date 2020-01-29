const { ApolloServer } = require("apollo-server-lambda");
import { resolvers } from "./resolvers";
import { typeDefs } from "./type-defs";

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
    // cache  // ref: https://www.apollographql.com/docs/apollo-server/data/data-sources/#using-memcachedredis-as-a-cache-storage-backend
    // server settings
    //   playground: process.env.NODE_ENV ? 'development' ? true : false,
    //   introspection: true,
    //   tracing: true
  })
});

// ref: https://hackernoon.com/create-a-serverless-graphql-server-using-express-apollo-server-and-aws-lambda-c3850a2092b5
