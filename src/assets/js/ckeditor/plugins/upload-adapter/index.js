import axios from 'axios';
import uploads from '../../../../../api/uploads';
import imageUtil from '../../../../../utils/image';

class UploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload. It sounds scary but do not
    // worry — the loader will be passed into the adapter later on in this guide.
    this.loader = loader;
  }

  // Starts the upload process.
  async upload() {
    try {
      this.source = axios.CancelToken.source();
      const file = await this.loader.file;
      const response = await uploads.upload(file, {
        cancelToken: this.source.token,
        onUploadProgress: (event) => {
          this.loader.uploadTotal = event.total;
          this.loader.uploaded = event.loaded;
        },
      });
      const path = response.data.data.path;

      return {
        default: imageUtil.getURL(path),
        200: imageUtil.getThumbnailURL(path, 200),
        400: imageUtil.getThumbnailURL(path, 400),
        600: imageUtil.getThumbnailURL(path, 600),
        800: imageUtil.getThumbnailURL(path, 800),
        1000: imageUtil.getThumbnailURL(path, 1000),
        1200: imageUtil.getThumbnailURL(path, 1200),
        1400: imageUtil.getThumbnailURL(path, 1400),
        1600: imageUtil.getThumbnailURL(path, 1600),
        1800: imageUtil.getThumbnailURL(path, 1800),
        1920: imageUtil.getThumbnailURL(path, 1920),
      };
    } catch (error) {
      return Promise.reject(error.message);
    }
  }

  // Aborts the upload process.
  abort() {
    this.source.cancel();
  }
}

export default function UploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new UploadAdapter(loader);
  };
}
