<template>
  <form @submit.prevent="submit">
    <div class="row">
      <div class="col-lg-10">
        <div class="row">
          <div class="col-sm-6">
            <div class="mb-3">
              <label class="form-label" for="name">Name</label>
              <input
                class="form-control"
                id="name"
                v-model="input.name"
                :class="{ 'is-invalid': errors.name }"
                :readonly="readonly"
              />
              <div class="invalid-feedback">
                {{ errors.name }}
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label" for="description">Description</label>
              <textarea
                class="form-control"
                id="description"
                v-model="input.description"
                :class="{ 'is-invalid': errors.description }"
                :readonly="readonly"
              />
              <div class="invalid-feedback">
                {{ errors.description }}
              </div>
            </div>

            <div v-if="input.id" class="mb-3">
              <label class="form-label" for="key">API Key</label>
              <input
                class="form-control"
                id="key"
                v-model="input.key"
                readonly
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="!readonly" class="col-lg-2 text-lg-end">
        <button class="btn btn-primary" :disabled="isSubmitting">
          Save
          <span
            v-if="isSubmitting"
            class="spinner-border spinner-border-sm ms-1"
          ></span>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import get from 'lodash/get';
import apis from '../../api/apis';
import routerUtil from '../../mixins/routerUtil';

export default {
  mixins: [routerUtil],

  props: ['readonly', 'api'],

  data() {
    return { errors: {}, input: {}, isSubmitting: false };
  },

  methods: {
    async submit() {
      try {
        this.errors = {};
        this.isSubmitting = true;

        if (this.input.id) {
          await apis.update(this.input);
        } else {
          await apis.create(this.input);
        }

        this.$alert.alert('success', 'API saved successfully.', {
          onOK: () => this.back('/apis'),
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
    api: {
      handler(api) {
        if (api) {
          this.input = { ...this.input, ...api.toJSON() };
        }
      },
      immediate: true,
    },
  },
};
</script>
