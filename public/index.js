'use strict';

const $urlInput = $('.url-input');
const $displayUrls = $('.display-urls');
const $submitButton = $('.submit-button');
const hostName = 'http://localhost:3000/';

const putUrlsOnPage = (urls) => {
  $displayUrls.html('');
  $.each(urls, (key,data) => {
    let { longURL, dateCreated, clicks } = data;
    let formatDate = moment(dateCreated).format('MMMM Do, YYYY, h:mm a');
    let shortURL = hostName + key;
     $displayUrls.append(
      `<article class="single-url">
        <p> Shortened URL: <a href="${shortURL}">${shortURL}</a> </p>
        <p> Original URL: <a href="${longURL}">${longURL}</a> </p>
        <p> Clicks: ${clicks} </p>
        <p> Date Created: ${formatDate} </p>
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
