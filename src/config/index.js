import api from '@/config/api';

export default {
  api,
  paginationLimit: process.env.PAGINATION_LIMIT || 10,
};
