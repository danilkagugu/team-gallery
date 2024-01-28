import axios from 'axios';

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

