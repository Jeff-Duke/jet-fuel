// const $ = require('jquery');
const $urlInput = $('.url-input');
const $displayUrls = $('.display-urls');
const $submitButton = $('.submit-button');
const $urlInputValue = $('.url-input');

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

$submitButton.on('click', (e) => {
  e.preventDefault();
  // let urlString = $urlInputValue.toString();
  // $.post('/api/URLs', { longURL: urlString
  // })
  // .then(getAllUrls());
  $.ajax({
    url: '/api/URLs/',
    type: 'POST',
    data: {longURL: $urlInput.val()},
    success: () => {
      getAllUrls();
    }
  });
});
