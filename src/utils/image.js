import pickBy from 'lodash/pickBy';
import config from '../config';

export default {
  getURL(path) {
    console.log(`${config.api.url}/v1/images/${path}`);
    return `${config.api.url}/v1/images/${path}`;
  },

  getThumbnailURL(path, width, height) {
    const tf = new URLSearchParams(pickBy({ w: width, h: height }, Boolean));
    const transform = btoa(tf).replace(/=+$/, '');
    const newPath = path.replace(/([/\w-]+?)(\.\w+?)?$/, `$1_${transform}$2`);

    return `${config.api.url}/v1/images/${newPath}`;
  },
};
