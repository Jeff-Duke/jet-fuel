const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// app.locals.URLs = {
//   xZB32: 'http://www.turing.io',
//   gsYqa: 'http://www.twitter.com',
//   hASp2: 'http://www.facebook.com',
// };

app.locals.URLs =[];

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Jet Fuel';
const host = `http://localhost:${app.get('port')}/`;

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/api/URLs/:shortURL', (request, response) => {
  const { shortURL } = request.params;
  let longURL = app.locals.URLs[shortURL];
  response.redirect(longURL);
});

app.get('/api/URLs/', (request, response) => {
  const URLs = app.locals.URLs;
  response.status(201).json({ URLs });
});

app.post('/api/URLs', (request, response) => {
  const { longURL } = request.body;
  const shortURL = Date.now();

  if(!longURL) {
    return response.status(422).send({
      error: 'No URL specified'
    });
  }

  app.locals.URLs[shortURL] = longURL;
  let fullShortenedURL = host + 'api/URLs/' + shortURL;

  response.status(201).json({ fullShortenedURL, longURL });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
