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
    let { longURL, dateCreated, clicks, shortUrl } = data;
    let formatDate = moment(dateCreated).format('MMMM Do, YYYY, h:mm a');
    let fullShortURL = hostName + shortUrl;
     $displayUrls.append(
      `<article class="single-url">
        <p>
          Shortened URL:
          <a href="${fullShortURL}">
            ${fullShortURL}
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

const sortUrls = (items, sortBy, sortMethod) => {
  let sortedUrls = _.orderBy(items, [sortBy], [sortMethod]);
  putUrlsOnPage(sortedUrls);
};

const sortByOldest = () => {
  let oldUrls = urls;
  sortUrls(oldUrls, 'dateCreated', 'asc');
};

const sortByNewest = () => {
  let newUrls = urls;
  sortUrls(newUrls, 'dateCreated', 'desc');
};

const sortByLonely = () => {
  let lonelyUrls = urls;
  sortUrls(lonelyUrls, 'clicks', 'asc');
};

const sortByPopular = () => {
  let popularUrls = urls;
  sortUrls(popularUrls, 'clicks', 'desc');
};


$oldestButton.on('click', (e) => {
  e.preventDefault();
  sortByOldest();
});

$newestButton.on('click', (e) => {
  e.preventDefault();
  sortByNewest();
});

$popularButton.on('click', (e) => {
  e.preventDefault();
  sortByPopular();
});

$lonelyButton.on('click', (e) => {
  e.preventDefault();
  sortByLonely();
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
