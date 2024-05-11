import pickBy from 'lodash/pickBy';
import api from '.';

export default {
  fetch(params) {
    return api.get('core/categories', { params });
  },

  fetchByID(id) {
    return api.get(`core/categories/${id}`);
  },

  create(data) {
    return api.post('core/categories', data);
  },

  update(data) {
    return api.put(
      `core/categories/${data.id}`,
      pickBy(data, (value) => value !== null)
    );
  },

  delete(id) {
    return api.delete(`core/categories/${id}`);
  },
};
