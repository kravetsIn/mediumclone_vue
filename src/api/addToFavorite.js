import axios from '@/plugins/axios';

const getUrl = (slug) => `/articles/${slug}/favorite`;

const addToFavorites = (slug) => axios.post(getUrl(slug))
  .then((response) => response.data.article);

const removeToFavorites = (slug) => axios.delete(getUrl(slug))
  .then((response) => response.data.article);

export default {
  addToFavorites,
  removeToFavorites,
};
