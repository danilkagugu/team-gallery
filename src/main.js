import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { Spinner } from 'spin.js';

axios.defaults.baseURL = 'https://api.unsplash.com';
axios.defaults.headers.common['Authorization'] =
  'Client-ID LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';

function getPhotos(query) {
  return axios.get('/search/photos', {
    params: {
      query,
      orientation: 'portrait',
    },
  });
}

const opts = {
  lines: 20, // The number of lines to draw
  length: 79, // The length of each line
  width: 17, // The line thickness
  radius: 54, // The radius of the inner circle
  scale: 0.45, // Scales overall size of the spinner
  corners: 0.6, // Corner roundness (0..1)
  speed: 1.6, // Rounds per second
  rotate: 44, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#89ff57', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '54%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 2px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

const spinnerContainer = document.querySelector('.js-backdrop');
const spinner = new Spinner(opts);

const formEl = document.querySelector('.js-search-form');
const listEl = document.querySelector('.js-gallery');

formEl.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  event.preventDefault();
  spinnerPlay();
  const searchQuery =
    event.currentTarget.elements['user-search-query'].value.trim();
  console.log(searchQuery);

  try {
    const {
      data: { results },
    } = await getPhotos(searchQuery);
    if (results.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }
    console.log(results);
    listEl.innerHTML = createMarkup(results);
  } catch (error) {
    console.log(error);
  } finally {
    spinnerStop();
  }
}

function createMarkup(arr) {
  return arr
    .map(item => {
      return `<li class='gallery__item'>
    <img src='${item.urls.small}' alt='${item.alt_description}' class='gallery-img' />
  </li>`;
    })
    .join('');
}

function spinnerPlay() {
  spinner.spin(spinnerContainer);
  spinnerContainer.classList.remove('is-hidden');
}

function spinnerStop() {
  spinner.stop();
  spinnerContainer.classList.add('is-hidden');
}
