<template>
  <ckeditor
    v-bind="ckeditorVue"
    v-if="isDelayed"
    :value="value || ''"
    :editor="editor"
    :config="config"
    @input="$emit('input', $event)"
  />
  <div v-else />
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue2';
import ClassicEditor from '../../assets/js/ckeditor/custom-build-classic';
import UploadAdapterPlugin from '../../assets/js/ckeditor/plugins/upload-adapter';

import BaseField from './BaseField';

export default {
  extends: BaseField,

  components: { ckeditor: CKEditor.component },

  props: ['ckeditorVue'],

  data() {
    return {
      editor: ClassicEditor,
      config: {
        extraPlugins: [UploadAdapterPlugin],

        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph',
            },
            {
              model: 'heading1',
              view: 'h2',
              title: 'Heading 2',
              class: 'ck-heading_heading2',
            },
            {
              model: 'heading3',
              view: 'h3',
              title: 'Heading 3',
              class: 'ck-heading_heading3',
            },
            {
              model: 'heading4',
              view: 'h4',
              title: 'Heading 4',
              class: 'ck-heading_heading4',
            },
            {
              model: 'heading5',
              view: 'h5',
              title: 'Heading 5',
              class: 'ck-heading_heading5',
            },
            {
              model: 'heading6',
              view: 'h6',
              title: 'Heading 6',
              class: 'ck-heading_heading6',
            },
          ],
        },

        image: {
          styles: ['alignLeft', 'alignCenter', 'alignRight', 'full', 'side'],

          // Configure the available image resize options.
          resizeOptions: [
            {
              name: 'imageResize:original',
              label: 'Original',
              value: null,
            },
            {
              name: 'imageResize:50',
              label: '50%',
              value: '50',
            },
            {
              name: 'imageResize:75',
              label: '75%',
              value: '75',
            },
          ],

          toolbar: [
            'imageStyle:alignLeft',
            'imageStyle:alignCenter',
            'imageStyle:alignRight',
            'imageStyle:full',
            '|',
            'imageResize',
            '|',
            'imageTextAlternative',
          ],
        },
      },
      isDelayed: false,
    };
  },

  mounted() {
    // Delay rendering CKEditor component to prevent blocking. CKEditor
    // rendering is very slow.
    // https://github.com/ckeditor/ckeditor5-vue/issues/124
    this.io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.isDelayed = true;
          this.io.disconnect();
        }
      });
    });
    this.io.observe(this.$el);
  },

  beforeDestroy() {
    this.io && this.io.disconnect();
  },
};
</script>

<style lang="scss">
:root {
  --ck-color-base-border: #{$border-color};
  --ck-border-radius: #{$border-radius};
  --ck-focus-ring: #{$border-width} solid #{$input-focus-border-color};
}

.ck {
  &.ck-toolbar,
  &.ck-editor__editable_inline {
    border-width: $border-width;
  }

  .is-invalid + & {
    .ck-toolbar,
    .ck-editor__editable_inline.ck-editor__editable_inline {
      border-color: $form-feedback-invalid-color;
    }
  }

  .ck-content {
    min-height: rem(240);
  }

  .ck-read-only.ck-read-only {
    background: $input-disabled-bg;
  }
}
</style>
