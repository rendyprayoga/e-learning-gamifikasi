import api from '.';

export default {
  fetch(params) {
    return api.get('core/ranks', { params });
  },

  fetchExportUrl(params) {
    return api.get('core/ranks/export-url', { params });
  },
};
