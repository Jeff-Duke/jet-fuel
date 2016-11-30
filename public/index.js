// const $ = require('jquery');
const $urlInput = $('.url-input');
const $displayUrls = $('.display-urls');
const $submitButton = $('.submit-button');


$(document).ready(() => {
  getAllUrls();
});

let getAllUrls = () => {
  $.getJSON('api/URLs', (data) => {
    putUrlsOnPage(data.URLs);
  });
};

let putUrlsOnPage = (urls) => {
  $.each(urls, (key,value) => {
     $displayUrls.append(
      `<div>
        ${key} is short for ${value}
      </div>`);
  });
};

// TODO:  need to render shorty, longy, date added, and how many times clicked
// TODO: sort by popularity and by date added both ascending and descending
// TODO: be able to click shortened URL

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
