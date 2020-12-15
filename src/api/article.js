import axios from '@/plugins/axios/index';

const getArticle = (slug) => axios.get(`/articles/${slug}`)
  .then((res) => res.data.article);

export default {
  getArticle,
};
