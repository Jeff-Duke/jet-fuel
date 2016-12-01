'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const shortid = require('shortid');
const normalizeUrl = require('normalize-url');
const request = require('request');
const cheerio = require('cheerio');

const fetchTitle = (longURL, callback) => {
 request(longURL, (error, externalResponse, body) => {
    if (error) { return callback(error); }

    let $ = cheerio.load(body);
    let title = $('head > title').text();
    
    callback(null, title);
  });
};

app.locals.URLs = {};

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Jet Fuel';
const host = `http://localhost:${app.get('port')}/`;

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/api/URLs/', (request, response) => {
  const URLs = app.locals.URLs;
  response.status(201).json({ URLs });
});

app.post('/api/URLs', (request, response) => {
  let { longURL } = request.body;
  longURL = normalizeUrl(longURL);
  let shortURL = shortid.generate(longURL);
  let dateCreated = Date.now();
  let clicks = 0;

  if(!longURL) {
    return response.status(422).send({
      error: 'No URL specified'
    });
  }

  fetchTitle(longURL, (error, title) => {
    if (error) { return response.status(422).send(error); }
    app.locals.URLs[shortURL] = { title, shortURL, longURL, dateCreated, clicks };
    let fullShortenedURL = host + shortURL;
    response.status(201).json({ fullShortenedURL, longURL });
  });
});

app.get('/:shortURL', (request, response) => {
  const { shortURL } = request.params;
  const link = app.locals.URLs[shortURL];

  if (!link) { return response.status(404).send('No such link, bozo.'); }
  link.clicks += 1;
  let longURL = link.longURL;

  response.status(302).redirect(longURL);
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
