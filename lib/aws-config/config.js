const dev = {
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_SMrf9D7JN",
    APP_CLIENT_ID: "7nbkers3kul57cc30gr7du20nu",
    IDENTITY_POOL_ID: "us-east-1:7add814b-bc5d-4f26-a5b6-da992beac63e"
  }
};

// from: https://console.aws.amazon.com/iam/home?region=us-east-1#/roles/slackernoozeuserpooldev-SMS-Role?section=trust
// IAM trust relationships, this is the old 'String Equals' field, changing
// to the above ID Pool id per:  https://stackoverflow.com/questions/44043289/aws-invalid-identity-pool-configuration-check-assigned-iam-roles-for-this-poo
// "sts:ExternalId": "5ae9c3ec-34d9-4fbd-a2ce-e7e78e0fb0a7"

const prod = {
  cognito: {
    REGION: "",
    USER_POOL_ID: "",
    APP_CLIENT_ID: "",
    IDENTITY_POOL_ID: ""
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  // Add common config values here
  ...config
};
