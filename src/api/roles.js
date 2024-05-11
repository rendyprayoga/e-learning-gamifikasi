import pickBy from 'lodash/pickBy';
import api from '.';

export default {
  fetch(params) {
    return api.get('core/roles', { params });
  },

  fetchByID(id) {
    return api.get(`core/roles/${id}`);
  },

  fetchModules() {
    return api.get('core/roles/modules');
  },

  create(data) {
    return api.post('core/roles', data);
  },

  update(data) {
    return api.put(
      `core/roles/${data.id}`,
      pickBy(data, (value) => value !== null)
    );
  },

  delete(id) {
    return api.delete(`core/roles/${id}`);
  },
};
