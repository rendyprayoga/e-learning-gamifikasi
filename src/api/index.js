import axios from 'axios';
import qs from 'qs';
import config from '../config';

export default axios.create({
  baseURL: config.api.url,
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: 'indices' });
  },
});
