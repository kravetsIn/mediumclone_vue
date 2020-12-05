import axios from '@/plugins/axios/index';

const getPopularTags = () => axios.get('/tags');

export default { getPopularTags };
