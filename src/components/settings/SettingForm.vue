<template>
  <form @submit.prevent="submit">
    <div class="row">
      <div class="col-lg-10">
        <div class="row">
          <div class="col-sm-6">
            <div class="mb-3">
              <label class="form-label" for="key">key</label>
              <input
                autocomplete="off"
                class="form-control"
                id="key"
                v-model="input.key"
                :readonly="input.id"
              />
              <div class="invalid-feedback">
                {{ errors.key }}
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label" for="settingType">Setting Type</label>
              <input
                autocomplete="off"
                class="form-control"
                id="settingType"
                v-model="input.settingType"
                :readonly="input.id"
              />
              <div class="invalid-feedback">
                {{ errors.settingType }}
              </div>
            </div>
          </div>
          <div class="col-sm-6" v-if="input.type === 'number'">
            <div class="mb-3">
              <label class="form-label" for="value">Value</label>
              <input
                autocomplete="off"
                class="form-control"
                id="value"
                v-model="input.value"
                :readonly="readonly"
              />
              <div class="invalid-feedback">
                {{ errors.value }}
              </div>
            </div>
          </div>
          <div class="col-sm-12" v-else-if="input.type === 'string'">
            <div class="mb-3">
              <label class="form-label" for="value">Value</label>
              <RichTextField
                autocomplete="off"
                class="form-control"
                id="value"
                v-model="input.value"
                :readonly="readonly"
              />
              <div class="invalid-feedback">
                {{ errors.value }}
              </div>
            </div>
          </div>
          <div v-else>
            <div class="mb-3">
              <label class="form-label" for="value">Value</label>
              <textarea
                autocomplete="off"
                class="form-control"
                id="value"
                v-model="input.value"
                :readonly="readonly"
              />
              <div class="invalid-feedback">
                {{ errors.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4" v-if="!readonly">
      <button class="btn btn-primary" :disabled="isSubmitting">
        Save
        <span
          v-if="isSubmitting"
          class="spinner-border spinner-border-sm ms-1"
        ></span>
      </button>
    </div>
  </form>
</template>

<script>
import get from 'lodash/get';
import settings from '../../api/settings';
import routerUtil from '../../mixins/routerUtil';
import RichTextField from '../forms/RichTextField.vue';

export default {
  mixins: [routerUtil],

  components: { RichTextField },

  props: ['backPath', 'readonly', 'setting'],

  data() {
    return { errors: {}, input: {}, isSubmitting: false };
  },

  methods: {
    async submit() {
      try {
        this.errors = {};
        this.isSubmitting = true;
        const input = this.input;

        if (this.input.id) {
          await settings.update(input);
        } else {
          await settings.create(input);
        }

        this.$alert.alert('success', 'Setting saved successfully.', {
          onOK: () => {
            this.backPath && this.back(this.backPath);
          },
        });
      } catch (error) {
        this.errors = get(error, 'response.data.error.errors', {});
        this.$alert.requestError(error);
      } finally {
        this.isSubmitting = false;
      }
    },
  },

  watch: {
    setting: {
      handler(setting) {
        if (setting) {
          this.input = { ...this.input, ...setting.toJSON() };
        }
      },
      immediate: true,
    },
  },
};
</script>
