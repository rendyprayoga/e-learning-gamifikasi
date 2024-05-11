<template>
  <form @submit.prevent="submit">
    <div class="row">
      <div class="col-lg-10">
        <div class="row">
          <div class="col-sm-6">
            <div class="mb-3">
              <label class="form-label" for="name">Role Name</label>
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
          </div>
        </div>

        <div class="mb-3">
          <RoleAccessField v-model="input.permissions" :readonly="readonly" />
        </div>
      </div>
    </div>

    <div v-if="!readonly" class="mt-4">
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
import roles from '../../api/roles';
import routerUtil from '../../mixins/routerUtil';

import RoleAccessField from '../roles/RoleAccessField';

export default {
  mixins: [routerUtil],

  components: { RoleAccessField },

  props: ['readonly', 'role'],

  data() {
    return { errors: {}, input: {}, isSubmitting: false };
  },

  methods: {
    async submit() {
      try {
        this.errors = {};
        this.isSubmitting = true;

        if (this.input.id) {
          await roles.update(this.input);
        } else {
          await roles.create(this.input);
        }

        this.$alert.alert('success', 'Role saved successfully.', {
          onOK: () => this.back('/roles'),
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
    role: {
      handler(role) {
        if (role) {
          this.input = { ...this.input, ...role.toJSON() };
        }
      },
      immediate: true,
    },
  },
};
</script>
