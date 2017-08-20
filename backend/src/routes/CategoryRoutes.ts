import {Router} from 'express';

import {getLegacyCategories, getCategories} from 'src/controllers/CategoryController';
import {getLegacyPlaylists, getPlaylists} from 'src/controllers/PlaylistController';

const router: Router = Router();

// legacy routes
router.get('/rest/service/v1/categories', (request, response) => {
  getLegacyCategories().then((categories) => {
    response.json(categories);
  });
});

// legacy routes
router.get('/rest/service/v1/categories/:id', (request, response) => {
  const categoryId = request.params.id;
  getLegacyPlaylists(categoryId).then((playlists) => {
    response.json(playlists);
  });
});

// new routes
router.get('/api/categories', (request, response) => {
  getCategories().then((categories) => {
    response.json(categories);
  });
});

// new routes
router.get('/api/categories/:id', (request, response) => {
  const categoryId = request.params.id;
  getPlaylists(categoryId).then((playlists) => {
    response.json(playlists);
  });
});

export default router;
