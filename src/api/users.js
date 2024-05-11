import pickBy from 'lodash/pickBy';
import api from '.';

export default {
  fetch(params) {
    return api.get('core/users', { params });
  },

  fetchByID(id) {
    return api.get(`core/users/${id}`);
  },

  create(data) {
    return api.post('core/users', data);
  },

  update(data) {
    return api.put(
      `core/users/${data.id}`,
      pickBy(data, (value) => value !== null)
    );
  },

  delete(id) {
    return api.delete(`core/users/${id}`);
  },
};
