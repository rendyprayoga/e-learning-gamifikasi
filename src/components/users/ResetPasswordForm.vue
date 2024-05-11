<template>
  <form @submit.prevent="submit">
    <div class="row">
      <div class="col-lg-10">
        <div class="row">
          <div class="col-sm-6">
            <div class="mb-3">
              <label class="form-label" for="password">Password</label>
              <input
                class="form-control"
                id="password"
                type="password"
                v-model="input.password"
                :class="{ 'is-invalid': errors.password }"
              />
              <div class="invalid-feedback">
                {{ errors.password }}
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label" for="confirmPassword"
                >Confirm Password</label
              >
              <input
                class="form-control"
                id="confirmPassword"
                type="password"
                v-model="input.confirmPassword"
                :class="{ 'is-invalid': errors.confirmPassword }"
              />
              <div class="invalid-feedback">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4">
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
import users from '../../api/users';
import routerUtil from '../../mixins/routerUtil';

export default {
  mixins: [routerUtil],

  props: ['user'],

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
          await users.update(input);
        } else {
          await users.create(input);
        }

        this.$alert.alert('success', 'Password reset successfully.', {
          onOK: () => {
            this.back('/users');
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
    user: {
      handler(user) {
        if (user) {
          this.input = { ...this.input, ...user };
        }
      },
      immediate: true,
    },
  },
};
</script>
