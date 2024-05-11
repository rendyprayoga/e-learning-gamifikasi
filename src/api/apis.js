import api from '.';

export default {
  fetch(params) {
    return api.get('core/apis', { params });
  },

  fetchByID(id) {
    return api.get(`core/apis/${id}`);
  },

  create(data) {
    return api.post('core/apis', data);
  },

  update(data) {
    return api.put(`core/apis/${data.id}`, data);
  },

  delete(id) {
    return api.delete(`core/apis/${id}`);
  },
};
