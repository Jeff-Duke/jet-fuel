const assert = require('assert');
const request = require('supertest');
const app = require('../server');

describe('GET all urls', () => {

  beforeEach(() => {
    app.locals.URLs = [{
      shortURL: 'www.short.com',
      longURL: 'www.areallylongwebaddress.com' }];
  });

  afterEach(() => {
    app.locals.URLs = [];
  });

  it('should return status 201 if successful', (done) => {
    request(app)
      .get('/api/URLs')
      .expect(201, done);
  });

});
