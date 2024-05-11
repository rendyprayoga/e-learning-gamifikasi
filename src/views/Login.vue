<template>
  <form @submit.prevent="login">
    <p class="fw-bold text-uppercase mb-4" style="color: black">Login</p>

    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Username"
        v-model="input.email"
        :class="{ 'is-invalid': errors.email }"
      />
      <div class="invalid-feedback">
        {{ errors.email }}
      </div>
    </div>

    <div class="mb-4">
      <input
        type="password"
        class="form-control"
        placeholder="Password"
        v-model="input.password"
        :class="{ 'is-invalid': errors.password }"
      />
      <div class="invalid-feedback">
        {{ errors.password }}
      </div>
    </div>

    <button
      type="submit"
      class="btn btn-primary"
      style="width: 263px"
      :disabled="isLoggingIn"
    >
      Login
      <span
        v-if="isLoggingIn"
        class="spinner-border spinner-border-sm ms-1"
      ></span>
    </button>
  </form>
</template>

<script>
import get from 'lodash/get';
// import interactsWithReCAPTCHA from '../mixins/interactsWithReCAPTCHA';

export default {
  // mixins: [interactsWithReCAPTCHA],

  data() {
    return {
      errors: {},
      input: {},
      isLoggingIn: false,
    };
  },

  methods: {
    async login() {
      try {
        this.errors = {};
        this.isLoggingIn = true;
        // const token = await this.executeRecaptcha();

        await this.$auth.login({
          ...this.input,
          // 'g-recaptcha-response': token,
        });
      } catch (error) {
        this.errors = get(error, 'response.data.error.errors', {});
        this.$alert.requestError(error);
      } finally {
        this.isLoggingIn = false;
      }
    },
  },
};
</script>
