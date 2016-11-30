// const assert = require('assert');
// const webdriverio = require('webdriverio');
// const app = require('../../server');
//
// const options = { desiredCapabilities: { browserName: 'chrome' } };
// const client = webdriverio.remote(options);
//
// let server;
// const port = process.env.PORT || 3001;
//
// before((done) => {
//   server = app.listen(port, (err, result) => {
//     if (err) { return done(err); }
//     done();
//   });
// });
//
// after((done) => {
//   server.close(done);
// });
