import api from '.';

export default {
  fetch(params) {
    return api.get('core/people', { params });
  },

  fetchByID(id) {
    return api.get(`core/people/${id}/byid`);
  },
};
