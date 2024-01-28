import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

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

const formEl = document.querySelector('.js-search-form');
const listEl = document.querySelector('.js-gallery');

formEl.addEventListener('submit', onSubmit)

async function onSubmit(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements['user-search-query'].value.trim()
  console.log(searchQuery);

  try {
    const { data: {results} } = await getPhotos(searchQuery)
    if (results.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
});
    }
    console.log(results);
    listEl.innerHTML = createMarkup(results);
  } catch (error) {
    console.log(error);
  } finally {
    
  }

}

function createMarkup(arr) {
  return arr.map(item => {
     return `<li class='gallery__item'>
    <img src='${item.urls.small}' alt='${item.alt_description}' class='gallery-img' />
  </li>`
   }).join('')
  
}