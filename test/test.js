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

  it('should return a short URL object if one was stored', (done) => {
    request(app)
      .get('/api/URLs')
      .expect(201, {URLs: app.locals.URLs}, done);
  });

  it('should return the correct URLs from the database', (done) => {
    request(app)
    .get('/api/URLs')
    .expect(201)
    .end(() => {
      let expectedResponse = [{
          shortURL: 'www.short.com',
          longURL: 'www.areallylongwebaddress.com' }];
      assert.deepEqual(app.locals.URLs, expectedResponse);
      done();
    });
  });
});

describe('GET a specific shortURL', () => {

  beforeEach(() => {
    this.URL = {
      shortURL: 'DJ3JN',
      longURL: 'www.areallylongwebaddress.com' };
    app.locals.URLs[this.URL.shortURL] = this.URL;
  });

  afterEach(() => {
    app.locals.URLs = [];
  });

  it('should return a 300 level response if specific shortURL is found in saved URL array', (done) => {
    request(app)
      .get(`/${this.URL.shortURL}`)
      .expect(302, done);
  });

  it('should return a saved URL with the specific shortURL provided', (done) => {

    request(app)
      .get(`/api/URLs/${this.URL.shortURL}`)
      .expect(302)
      .end(() => {
        assert.equal(this.URL.longURL, 'www.areallylongwebaddress.com');
        done();
      });
  });
});

describe('submit (POST) a long url', () => {

  beforeEach(() => {
    app.locals.URLs = [];
  });

  it('should start out as an empty array of urls', (done) => {
    request(app)
      .get('/api/URLs')
      .end(() => {
        assert.equal(app.locals.URLs.length, 0);
        done();
      });
  });

  it('should return a 201 status code when a new URL is entered', (done) => {
    const longURL = 'www.areallylongwebaddress.com';

    request(app)
      .post('/api/URLs')
      .send({ longURL })
      .expect(201, done);
  });

  it('should return a 422 error if no url was submitted', (done) => {

    request(app)
      .post('/api/URLs')
      .send({ })
      .expect(422, done);
  });

  it('should add a new URL', (done) => {
    const newLongURL =  {longURL: 'www.areallylongwebaddress.com'};

    request(app)
      .post('/api/URLs')
      .send(newLongURL)
      .expect(201)
      .end(() => {
        assert.equal(Object.keys(app.locals.URLs).length, 1);
        done();
      });
  });
});
