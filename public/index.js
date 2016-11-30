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
      `<div class="single-url">
        ${key} is short for ${value}
      </div>`);
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
