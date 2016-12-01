'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const shortid = require('shortid');
const normalizeUrl = require('normalize-url');
const request = require('request');
const cheerio = require('cheerio');

const fetchTitle = (longURL) => {
  request(longURL, (error, response, body) => {
    if(!error && response.statusCode == 200) {
      let $ = cheerio.load(body);
      let title = $('head > title').text();
      console.log('title from within the fetchTitle function: ', title);
      return title;
    }
  });
};

const checkURL = (longURL) => {
    request(longURL, (error, response) => {
    if(error || response.statusCode != 200) {
      return response.statusCode.send('There was a problem with your request');
    }
    else console.log(response.statusCode);
  });
};

app.locals.URLs = {
  xZB32: { longURL: 'http://www.turing.io', dateCreated: 1480540827272, clicks: 2},
  gsYqa: { longURL: 'http://www.twitter.com', dateCreated: 1480540869274, clicks: 0}, 
  hASp2: { longURL: 'http://www.facebook.com', dateCreated: 1480540923909, clicks: 3}
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

  checkURL(longURL);
  fetchTitle(longURL);

  if(!longURL) {
    return response.status(422).send({
      error: 'No URL specified'
    });
  }
  
  app.locals.URLs[shortURL] = { longURL, dateCreated, clicks };
  
  let shortenedURL = host + shortURL;
  response.status(201).json({ shortenedURL, longURL });
});

app.get('/:shortURL', (request, response) => {
  const { shortURL } = request.params;
  const link = app.locals.URLs[shortURL];

  if (!link) { return response.status(404).send('No such link, bozo.'); }
  link.clicks += 1;
  let longURL = link.longURL;

  response.redirect(longURL);
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
