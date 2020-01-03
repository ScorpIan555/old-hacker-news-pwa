let envConfig = {
  IS_SERVER: !process.browser,
  BUNDLE_ANALYZE: process.env.BUNDLE_ANALYZE,
  NODE_ENV: process.env.NODE_ENV,
  CUSTOM_ENV: process.env.CUSTOM_ENV,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  IS_PROD: process.env.NODE_ENV === 'production',
  GA_TRACKING_ID: process.env.GA_TRACKING_ID || 'XXX-XXX-XXX',
  API_URL: process.env.API_URL,
  APP_SECRET: process.env.APP_SECRET
};

console.log('config.config::::', envConfig);

const AUTH_TOKEN = 'auth-token';

module.exports = {
  envConfig,
  AUTH_TOKEN
};
