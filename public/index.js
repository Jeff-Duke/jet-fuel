
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
  // let arr = Object.entries(urls);
  //
  // console.log(pizzas);

  // Object.keys(urls).map((key, value) => {
  //   console.log(key, value);
  // });
};
