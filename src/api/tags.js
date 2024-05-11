import api from '.';

export default {
  fetch(params) {
    return api.get('core/tags', { params });
  },
};
