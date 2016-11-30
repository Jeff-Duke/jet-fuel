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
});

describe('GET a specific shortURL', () => {

  beforeEach(() => {
    this.URL = {
      shortURL: 'www.short.com',
      longURL: 'www.areallylongwebaddress.com' };
    app.localsURLs = [this.URL];
  });

  afterEach(() => {
    app.locals.URLs = [];
  });

  it('should return a 300 level response if specific shortURL is found in saved URL array', (done) => {
    request(app)
      .get(`/api/URLs/${this.URL.shortURL}`)
      .expect(302, done);
  });

  // it('should return a saved URL with the specific shortURL provided', (done) => {
  //   const url = this.URL;
  //   // const [ url ] = app.locals.URLs;
  //
  //   request(app)
  //     .get(`/api/URLs/${this.URL.shortURL}`)
  //     .expect(302, { url }, done);
  // });
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

  // it('should add a new URL', (done) => {
  //   const newLongURL = 'www.areallylongwebaddress.com';
  //
  //   let checkAgain = () => {
  //       request(app)
  //         .get('/api/URLs');
  //   };
  //
  //   request(app)
  //     .post('/api/URLs')
  //     .send({ newLongURL })
  //     .expect(201, checkAgain())
  //     .end(() => {
  //       assert.equal(app.locals.URLs.length, 1);
  //       done();
  //     });
  // });

});