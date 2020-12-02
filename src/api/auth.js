import axios from '@/plugins/axios';

const register = (credentials) => axios.post('/users', { user: credentials });

export default {
  register,
};
