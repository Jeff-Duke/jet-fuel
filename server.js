'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const urlChars = '123456789bcdfghjkmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ';

app.locals.URLs = {
  xZB32: 'http://www.turing.io',
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Jet Fuel';

app.get('/', (request, response) => {
  response.send('Let\'s shorten that URL');
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

  response.status(201).json({ shortURL, longURL});
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
