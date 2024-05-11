import api from '.';

export default {
  fetch(params) {
    return api.get('core/reports', { params });
  },

  fetchExportUrl(params) {
    return api.get('core/reports/export-url', { params });
  },
};
