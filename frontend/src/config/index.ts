const BACKEND_URL = process.env.BACKEND_URL;

export default {
  BACKEND_URL,
  API: {
    AUTH_LOCAL_LOGIN: BACKEND_URL + '/auth/local',
    AUTH_GOOGLE_LOGIN: BACKEND_URL + '/auth/google',
  },
};
