// graphql.js
import { server } from "./index";

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
