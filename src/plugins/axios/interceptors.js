import { getItem } from '@/helpers/persistanceStorage';

const setParams = (config) => {
  const token = getItem('accessToken');
  const authToken = token ? `Token ${token}` : '';

  // eslint-disable-next-line no-param-reassign
  config.headers.authorization = authToken;

  return config;
};

export default function (axios) {
  axios.interceptors.request.use(setParams);
}
