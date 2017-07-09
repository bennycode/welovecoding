import {APP_ENV, POSSIBLE_APP_ENVS} from 'src/config/environment';

if (APP_ENV === POSSIBLE_APP_ENVS.TESTING) {
  require('dotenv').config();
}
import * as request from 'supertest';
import Server from 'Server';

import resetDatabase from 'src/util/database/reset_database';
import {populateAll} from 'src/util/database/populate_database';

beforeEach(() => {
  return resetDatabase().then(() => {
    return populateAll();
  });
});

describe('Server', () => {
  test('/rest/service/v1/categories', () => {
    const instance = new Server();
    it('returns categories', done => {
      request(instance.app)
        .get('/rest/service/v1/categories')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error, response) => {
          if (error) {
            done.fail(error);
          } else {
            const categories = response.body;

            // Check order of properties
            const anyCategory = categories[0];
            const propertyOrder = [
              'id',
              'name',
              'color',
              'numberOfVideos',
              'availableLanguages',
            ];
            expect(Object.keys(anyCategory)).toEqual(propertyOrder);

            // Check HEX colors
            categories.forEach(category => {
              expect(category.color.startsWith('#')).toBe(true);
            });

            // Check available languages
            const java = categories.find(category => category.name === 'Java');
            expect(java.availableLanguages.length).toBe(1);

            done();
          }
        });
    });
  });
});
