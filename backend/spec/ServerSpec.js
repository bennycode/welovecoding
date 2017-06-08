const request = require('supertest');
const server = require('../dist/Server');

describe('Server', () => {

  const instance = new server.default();

  describe('REST API v1', () => {

    it('supports our legacy API', (done) => {
      request(instance.app)
        .get('/rest/service/v1/categories')
        .expect(200)
        .end((error) => {
          if (error) {
            done.fail(error);
          } else {
            done();
          }
        });
    });

  });
});
