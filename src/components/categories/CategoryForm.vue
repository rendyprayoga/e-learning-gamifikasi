<template>
  <form @submit.prevent="submit">
    <div class="row">
      <div class="col-lg-10">
        <div class="row">
          <div class="col-sm-6">
            <div class="mb-3">
              <label class="form-label" for="fullname">Kategori</label>
              <input
                class="form-control"
                id="fullname"
                v-model="input.name"
                :class="{ 'is-invalid': errors.name }"
                :readonly="readonly"
              />
              <div class="invalid-feedback">
                {{ errors.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <router-link
          class="btn btn-primary"
          style="
            margin-right: 10px;
            background-color: #e7b325;
            color: black;
            border: none;
          "
          to="/categories"
        >
          Kembali
        </router-link>
        <button
          class="btn btn-primary"
          style="background-color: #e7b325; color: black; border: none"
          :disabled="isSubmitting"
          v-if="!readonly"
        >
          Simpan
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
import categories from '../../api/categories';
import routerUtil from '../../mixins/routerUtil';

export default {
  mixins: [routerUtil],

  components: {},

  props: ['backPath', 'readonly', 'category'],

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
          await categories.update(input);
        } else {
          await categories.create(input);
        }

        this.$alert.alert('success', 'Category berhasil disimpan', {
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
    category: {
      handler(category) {
        if (category) {
          this.input = { ...this.input, ...category.toJSON() };
        }
      },
      immediate: true,
    },
  },
};
</script>
