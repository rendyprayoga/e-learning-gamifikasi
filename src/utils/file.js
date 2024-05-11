import config from '../config';

export default {
  getURL(path) {
    return `${config.file.url}/${path}`;
  },
};
