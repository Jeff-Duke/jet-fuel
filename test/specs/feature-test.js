const assert = require('assert');
const webdriverio = require('webdriverio');
const app = require('../../server');

const options = { desiredCapabilities: { browserName: 'chrome' } };
const client = webdriverio.remote(options);

let server;
const port = process.env.PORT || 3001;

before((done) => {
  server = app.listen(port, (err, result) => {
    if (err) { return done(err); }
    done();
  });
});

after((done) => {
  server.close(done);
});

describe('Jet Fuel homepage', () => {

  it('should have the title stored in app.locals.title', (done) => {
    client
      .init()
      .url(`http://localhost:${port}/`)
      .getTitle().then((title) => {
          assert.equal(title, app.locals.title);
          done();
      });
      done();
  }).timeout(10000);

});
