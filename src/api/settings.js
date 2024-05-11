import pickBy from 'lodash/pickBy';
import api from '.';

export default {
  fetch(params) {
    return api.get('core/settings', { params });
  },

  fetchByID(id) {
    return api.get(`core/settings/${id}/byid`);
  },

  update(data) {
    return api.put(
      `core/settings/${data.key}`,
      pickBy(data, (value) => value !== null)
    );
  },
  create(data) {
    return api.post('core/settings', data);
  },

  delete(id) {
    return api.delete(`core/settings/${id}`);
  },
};
