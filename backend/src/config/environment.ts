export const POSSIBLE_ENVS = {
  PRODUCTION: 'production',
  STAGING: 'staging',
  DEVELOPMENT: 'development',
};
export const ENV = process.env.ENV || POSSIBLE_ENVS.DEVELOPMENT;
