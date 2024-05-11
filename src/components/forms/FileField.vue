<template>
  <div>
    <label class="d-block position-relative">
      <span
        v-if="value"
        class="form-control"
        :class="{ 'cursor-pointer': !readonly }"
        :readonly="readonly"
      >
        {{ value.split('/').pop() }}
      </span>
      <input
        v-if="!readonly"
        class="form-control"
        type="file"
        v-bind="attrs"
        :disabled="isUploading"
        :class="{ 'd-none': value }"
        @change="handleChange"
      />
      <span
        v-if="isUploading"
        class="progress h-auto position-absolute top-0 bottom-0 start-0 end-0"
      >
        <div
          class="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-valuenow="progress"
          :style="{ width: `${progress}%` }"
        ></div>
      </span>
    </label>

    <video v-if="isVideo" class="w-100 rounded mt-3" controls>
      <source :src="fileUtil.getURL(value)" />
      Sorry, your browser doesn't support embedded videos.
    </video>
  </div>
</template>

<script>
import uploads from '../../api/uploads';
import fileUtil from '../../utils/file';

import BaseField from './BaseField';

export default {
  extends: BaseField,

  props: ['readonly'],

  data() {
    return {
      isUploading: false,
      progress: null,
    };
  },

  computed: {
    isVideo() {
      return (
        this.value &&
        this.value.match(
          /\.(webm|mpg|mp2|mpeg|mpe|mpv|ogg|mp4|m4p|m4v|avi|wmv|mov|qt|flv|swf|avchd)$/i
        )
      );
    },
  },

  methods: {
    async handleChange(event) {
      try {
        this.isUploading = true;
        const response = await uploads.upload(event.target.files[0], {
          onUploadProgress: (progressEvent) => {
            this.progress = progressEvent.lengthComputable
              ? (progressEvent.loaded / progressEvent.total) * 100
              : 100;
          },
        });

        this.$emit('input', response.data.data.path);
      } catch (error) {
        this.$alert.requestError(error);
      } finally {
        this.isUploading = false;
        event.target.value = '';
      }
    },
  },

  beforeCreate() {
    this.fileUtil = fileUtil;
  },
};
</script>

<style lang="scss" scoped>
.form-control {
  .is-invalid & {
    border-color: $form-feedback-invalid-color;
  }
}
</style>
