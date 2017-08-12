import {Router} from 'express';

import {getLegacyCategories, getCategories} from 'src/controllers/CategoryController';

const router: Router = Router();

// legacy routes
router.get('/rest/service/v1/categories', (request, response) => {
  getLegacyCategories().then((categories) => {
    response.json(categories);
  });
});

// new routes
router.get('/api/categories', (request, response) => {
  getCategories().then((categories) => {
    response.json(categories);
  });
});

export default router;
