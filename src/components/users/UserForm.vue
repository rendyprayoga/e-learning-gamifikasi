<template>
  <form @submit.prevent="submit">
    <div class="row">
      <div class="col-lg-10">
        <div class="row">
          <div class="col-sm-6">
            <div class="mb-3">
              <label class="form-label" for="fullname">Name</label>
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

            <div class="mb-3">
              <label class="form-label" for="email">Username</label>
              <input
                class="form-control"
                id="email"
                type="text"
                v-model="input.email"
                :class="{ 'is-invalid': errors.email }"
                :readonly="readonly"
              />
              <div class="invalid-feedback">
                {{ errors.email }}
              </div>
            </div>

            <template v-if="!readonly">
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
            </template>

            <div v-if="$auth.user.can('users.update')" class="mb-3">
              <label class="form-label" for="roleId">Role</label>
              <RoleField
                v-model="input.roleId"
                :attrs="{ id: 'roleId' }"
                :class="{ 'is-invalid': errors.roleId }"
                :vueSelect="{ disabled: readonly }"
              />
              <div class="invalid-feedback">
                {{ errors.roleId }}
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
import users from '../../api/users';
import routerUtil from '../../mixins/routerUtil';

import RoleField from '../roles/RoleField';

export default {
  mixins: [routerUtil],

  components: {
    RoleField,
  },

  props: ['backPath', 'readonly', 'user'],

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

        this.$alert.alert('success', 'Data berhasil di simpan.', {
          onOK: () => {
            if (input.id === this.$auth.user.id) {
              this.$store.commit('auth/setUser', input);
            }

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
    user: {
      handler(user) {
        if (user) {
          this.input = { ...this.input, ...user.toJSON() };
        }
      },
      immediate: true,
    },
  },
};
</script>
