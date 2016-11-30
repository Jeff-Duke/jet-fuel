'use strict';

const $urlInput = $('.url-input');
const $displayUrls = $('.display-urls');
const $submitButton = $('.submit-button');
const $urlContainer = $('.display-urls');

const putUrlsOnPage = (urls) => {
  $urlContainer.html('');
  $.each(urls, (key,data) => {
    let { longURL, dateCreated, clicks } = data;
    let shortURL = 'http://localhost:3000/api/URLs/' + key;
     $displayUrls.append(
      `<article class="single-url">
        <p> Shortened URL: <a href="${shortURL}">${shortURL}</a> </p>
        <p> Original URL: <a href="${longURL}>">${longURL}</a> </p>
        <p> Clicks: ${clicks} </p>  
        <p> Date Created: ${dateCreated} </p>
      </article>`);
  });
};

const getAllUrls = () => {
  $.getJSON('api/URLs', (data) => {
    putUrlsOnPage(data.URLs);
  });
};

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