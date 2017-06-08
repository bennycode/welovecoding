const request = require('supertest');
const server = require('../dist/Server');

const instance = new server.default();

request(instance.app)
  .get('/rest/service/v1/categories')
  .expect(200)
  .end((error) => {
    if (error) throw error;
    console.log('Done');
  });
