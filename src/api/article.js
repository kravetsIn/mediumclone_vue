import axios from '@/plugins/axios/index';

const getArticle = (slug) => axios.get(`/articles/${slug}`)
  .then((res) => res.data.article);

const deleteArticle = (slug) => axios.delete(`/articles/${slug}`);

export default {
  getArticle,
  deleteArticle,
};
