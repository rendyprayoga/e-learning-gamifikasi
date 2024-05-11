import pickBy from 'lodash/pickBy';
import api from '.';

export default {
  fetch(params) {
    return api.get('core/questions', { params });
  },

  fetchByID(id) {
    return api.get(`core/questions/${id}`);
  },

  create(data) {
    return api.post('core/questions', data);
  },

  saveExamp(categoryId, data) {
    return api.post(`core/questions/student/${categoryId}`, data);
  },

  update(data) {
    return api.put(
      `core/questions/${data.id}`,
      pickBy(data, (value) => value !== null)
    );
  },

  delete(id) {
    return api.delete(`core/questions/${id}`);
  },
};
