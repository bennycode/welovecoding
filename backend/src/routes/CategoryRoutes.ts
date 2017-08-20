import {Router} from 'express';
import * as cors from 'cors';

import {getLegacyCategories, getCategories} from 'src/controllers/CategoryController';
import {getLegacyPlaylists, getPlaylists} from 'src/controllers/PlaylistController';

const router: Router = Router();

// legacy routes
router.get('/rest/service/v1/categories', cors(), (request, response) => {
  getLegacyCategories().then((categories) => {
    response.json(categories);
  });
});

// legacy routes
router.get('/rest/service/v1/categories/:id', cors(), (request, response) => {
  const categoryId = request.params.id;
  getLegacyPlaylists(categoryId).then((playlists) => {
    response.json(playlists);
  });
});

// new routes
router.get('/api/categories', cors(), (request, response) => {
  getCategories().then((categories) => {
    response.json(categories);
  });
});

// new routes
router.get('/api/categories/:id', cors(), (request, response) => {
  const categoryId = request.params.id;
  getPlaylists(categoryId).then((playlists) => {
    response.json(playlists);
  });
});

export default router;
