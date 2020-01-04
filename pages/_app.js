import React from "react";
import App from "next/app";
import Auth from "@aws-amplify/auth";
import Amplify from "@aws-amplify/auth";

// file imports
import AwsAuthConfig from "../lib/aws-config/AwsAuthConfig";
import { withApollo } from "../lib/apollo/client";

Amplify.configure({ Auth: AwsAuthConfig.Auth });

class MyApp extends App {
  state = {};

  static async getInitialProps({ ctx }) {
    // console.log("ctx::::", ctx);

    return {
      isServer: ctx.hasOwnProperty("req")
    };
  }

  async componentDidMount() {
    console.log("AwsAuthConfig::", AwsAuthConfig);
    try {
      await Auth.currentCredentials()
        .then(response => console.log("auth.res::", response))
        .catch(err => console.log("err::", err));
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    console.log("_app.js - this.props:::", this.props);

    return <Component {...pageProps} />;
  }
}

export default withApollo(MyApp);
