import axios from '@/plugins/axios/index';

const getFeed = (apiUrl) => axios.get(apiUrl);

export default { getFeed };
