import pickBy from 'lodash/pickBy';
import api from '.';

export default {
  fetch(params) {
    return api.get('core/answers', { params });
  },

  fetchByID(id) {
    return api.get(`core/answers/${id}`);
  },

  create(data) {
    return api.post('core/answers', data);
  },

  update(data) {
    return api.put(
      `core/answers/${data.id}`,
      pickBy(data, (value) => value !== null)
    );
  },

  delete(id) {
    return api.delete(`core/answers/${id}`);
  },
};
