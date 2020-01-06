// React + NextJs framework imports
import React from "react";
import Head from "next/head";
// ApolloClient-related imports
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
// other imports
import Auth from "@aws-amplify/auth";
import fetch from "isomorphic-unfetch";
import { HttpLink } from "apollo-link-http";

// use global variable
let globalApolloClient = null;

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName =
      PageComponent.displayName || PageComponent.name || "Component";

    if (displayName === "App") {
      console.warn("This withApollo HOC only works with PageComponents.");
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const { AppTree } = ctx;

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient());

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === "undefined") {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import("@apollo/react-ssr");
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient
                }}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error("Error while running `getDataFromTree`", error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState
      };
    };
  }

  return WithApollo;
}

/**
 * Always creates a new apollo client on the server
. * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === "undefined") {
    return createApolloClient(initialState);
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState);
  }

  return globalApolloClient;
}

async function fetchToken(uri, options) {
  console.log("fetchToken.uri", uri);
  console.log("fetchToken.optinos:::", options);

  // console.log();
  Auth.currentSession()
    .then(session => {
      console.log("current Creds session::", session);
      options.headers.idToken = session.idToken.jwtToken;
      options.headers.refreshToken = session.refreshToken.token;
      options.headers.accessToken = session.accessToken.jwtToken;
      return fetch(uri, options);
    })
    .catch(error => {
      console.log("derp:", error);
      console.error(error);
    })
    .then(res => {
      return fetch(uri, options);
    });

  //   return Auth.currentSession()
  //     .then(res1 => console.log("res1.currentSession", res1))
  //     .getRefreshToken()
  //     .then(res2 => console.log("res2.refreshToken::", res2))
  //     .getToken()
  //     .then(res3 => console.log("res3.getToken()", res3))
  //     .catch(error => console.log("error::", error));
  // }
}

const httpLink = new HttpLink({
  uri: "https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn",
  credentials: "same-origin",
  fetch: fetchToken
});

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}) {
  const ssrMode = typeof window === "undefined";
  const cache = new InMemoryCache().restore(initialState);

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode,
    // fetch,
    link: createIsomorphLink(),
    cache
  });
}

function createIsomorphLink() {
  if (typeof window === "undefined") {
    // need to find out if possi
    const { SchemaLink } = require("apollo-link-schema");
    const { schema } = require("./schema");
    return new SchemaLink({ schema });
  } else {
    return ApolloLink.from([httpLink]);
  }
}

// function createIsomorphLink() {
//   if (typeof window === "undefined") {
//     const { SchemaLink } = require("apollo-link-schema");
//     const { schema } = require("./schema");
//     return new SchemaLink({ schema });
//   } else {
//     const { HttpLink } = require("apollo-link-http");
//     return new HttpLink({
//       uri: "https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn",
//       credentials: "same-origin"
//       // fetch: () =>
//       //   Auth.getCurrentCredentials().then(res =>
//       //     console.log("ApolloClient.res:::", res)
//       //   )
//     });
//   }
// }
