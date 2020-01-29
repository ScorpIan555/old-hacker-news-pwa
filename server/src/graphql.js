// graphql.js
// const server = "./index";
const { ApolloServer } = require("apollo-server-lambda");
const { resolvers } = "./resolvers";
const { typeDefs } = "./type-defs";

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

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true
  }
});

// exports.graphqlHandler = server.createHandler({
//   cors: {
//     origin: true,
//     credentials: true
//   }
// });
