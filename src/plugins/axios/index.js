import axios from 'axios';
import interceptors from '@/plugins/axios/interceptors';

const instance = axios.create({
  baseURL: 'https://conduit.productionready.io/api',
});

interceptors(instance);

export default instance;
