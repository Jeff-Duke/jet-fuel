const $urlInput = $('.url-input');
const $displayUrls = $('.display-urls');


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
