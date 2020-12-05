import axios from 'axios';
import interceptors from '@/plugins/axios/interceptors';
import config from '@/config/index';

const { api } = config;

const instance = axios.create({
  baseURL: api.baseUrl,
});

interceptors(instance);

export default instance;
