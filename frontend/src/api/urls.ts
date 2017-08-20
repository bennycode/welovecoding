const BACKEND_URL = process.env.APP_URL_BACKEND;
const DEPRECATED = BACKEND_URL + '/rest/service/v1';
const API_BASE = BACKEND_URL + '/api';

export default {
  CATEGORIES_DEPRECATED: DEPRECATED + '/categories',
  CATEGORIES: API_BASE + '/categories',
};
