'use strict';

const $urlInput = $('.url-input');
const $displayUrls = $('.display-urls');
const $submitButton = $('.submit-button');
const $oldestButton = $('.oldest-button');
const $newestButton = $('.newest-button');
const $popularButton = $('.popular-button');
const $lonelyButton = $('.lonely-button');
const hostName = 'http://localhost:3000/';

let urls;

const putUrlsOnPage = (allUrls = urls) => {
  $displayUrls.html('');
  $.each(allUrls, (key,data) => {
    let { longURL, dateCreated, clicks } = data;
    let formatDate = moment(dateCreated).format('MMMM Do, YYYY, h:mm a');
    let shortURL = hostName + key;
     $displayUrls.append(
      `<article class="single-url">
        <p>
          Shortened URL:
          <a href="${shortURL}">
            ${shortURL}
          </a>
        </p>
        <p>
          Original URL:
          <a href="${longURL}">
            ${longURL}
          </a>
        </p>
        <p>
          Clicks: ${clicks}
        </p>
        <p>
          Date Created: ${formatDate}
        </p>
      </article>`);
  });
};

const getAllUrls = () => {
  $.getJSON('api/URLs', (data) => {
    urls = (data.URLs);
    putUrlsOnPage();
  });
};

// TODO (in the works) - implement sorting functions

$oldestButton.on('click', (e) => {
  e.preventDefault();
});

$newestButton.on('click', (e) => {
  e.preventDefault();
});

$popularButton.on('click', (e) => {
  e.preventDefault();
});

$lonelyButton.on('click', (e) => {
  e.preventDefault();
});

$submitButton.on('click', (e) => {
  e.preventDefault();
  $.ajax({
    url: '/api/URLs/',
    type: 'POST',
    data: {longURL: $urlInput.val()},
    success: () => {
      getAllUrls();
      $urlInput.val('');
    }
  });
});

$(document).ready(() => {
  getAllUrls();
});
