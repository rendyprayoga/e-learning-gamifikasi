import api from '.';

export default {
  upload(file, config = {}) {
    const formData = new FormData();
    formData.append('file', file);

    return api.post('core/files', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      ...config,
    });
  },
};
