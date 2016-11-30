const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.locals.URLs = {
  xZB32: { longURL: 'http://www.turing.io', dateCreated: 1480540827272, clicks: 0},
  gsYqa: { longURL: 'http://www.twitter.com', dateCreated: 1480540869274, clicks: 0}, 
  hASp2: { longURL: 'http://www.facebook.com', dateCreated: 1480540923909, clicks: 0}
};

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

  let longURL = app.locals.URLs[shortURL].longURL;
  response.redirect(longURL);
});

app.get('/api/URLs/', (request, response) => {
  const URLs = app.locals.URLs;
  response.status(201).json({ URLs });
});

app.post('/api/URLs', (request, response) => {
  const { longURL } = request.body;
  const shortURL = Date.now();
  let dateCreated = Date.now();
  let clicks = 0;

  if(!longURL) {
    return response.status(422).send({
      error: 'No URL specified'
    });
  }

  app.locals.URLs[shortURL] = { longURL, dateCreated, clicks };
  
  let fullShortenedURL = host + 'api/URLs/' + shortURL;

  response.status(201).json({ fullShortenedURL, longURL });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
