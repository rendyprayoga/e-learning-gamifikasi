<template>
  <label
    class="d-block position-relative ratio ratio-1x1 rounded mr-2"
    :class="[
      {
        'cursor-pointer': !readonly,
        'has-value': value,
        'is-uploading': isUploading,
      },
      `ratio-${ratio || '1x1'}`,
    ]"
  >
    <div v-if="value" class="position-absolute top-0 bottom-0 start-0 end-0">
      <img
        class="w-100 h-100 of-cover rounded"
        :src="
          imageUtil.getThumbnailURL(
            ...(ratio === '21x9' ? [value, 530] : [value, 492, 492])
          )
        "
      />
    </div>

    <div
      v-if="!readonly"
      class="icon-wrapper d-flex rounded justify-content-center align-items-center position-absolute top-0 bottom-0 start-0 end-0"
    >
      <span v-if="isUploading" class="spinner-border"></span>
      <PencilIcon v-else-if="value" class="fs-2" />
      <PlusIcon v-else class="fs-1" />
    </div>

    <input
      v-if="!readonly"
      accept="image/*"
      class="d-none"
      type="file"
      :disabled="isUploading"
      @change="handleChange"
    />
  </label>
</template>

<script>
import uploads from '../../api/uploads';
import imageUtil from '../../utils/image';

import BaseField from './BaseField';
import PencilIcon from 'bootstrap-icons/icons/pencil.svg';
import PlusIcon from 'bootstrap-icons/icons/plus.svg';

export default {
  extends: BaseField,

  components: { PencilIcon, PlusIcon },

  props: ['ratio', 'readonly'],

  data() {
    return { isUploading: false };
  },

  methods: {
    async handleChange(event) {
      try {
        this.isUploading = true;
        const response = await uploads.upload(event.target.files[0]);

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
    this.imageUtil = imageUtil;
  },
};
</script>

<style lang="scss" scoped>
label {
  border: 2px dashed $border-color;

  &.is-invalid {
    border-color: $form-feedback-invalid-color;
  }

  &.has-value {
    border-color: transparent;

    .icon-wrapper {
      background: rgba($black, 0.25);
      color: $white;
      opacity: 0;
      transition: opacity 0.15s;
    }

    &.is-uploading,
    &:hover {
      .icon-wrapper {
        opacity: 1;
      }
    }
  }
}
</style>
