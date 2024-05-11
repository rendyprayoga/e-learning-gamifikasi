<template>
  <div class="table-responsive">
    <table class="table table-borderless table-hover">
      <thead>
        <tr style="background-color: #1d1b64; color: black">
          <th>Module</th>
          <th
            v-for="permission of allPermissions"
            class="text-center"
            :key="permission.code"
          >
            {{ permission.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="module of modules" :key="module.code">
          <td>{{ module.label }}</td>
          <td
            v-for="permission of allPermissions"
            class="text-center"
            :key="permission.code"
          >
            <ToggleField
              v-if="
                input[module.code] &&
                input[module.code][permission.code] !== undefined
              "
              :value="input[module.code][permission.code]"
              :readonly="readonly"
              @input="input[module.code][permission.code] = $event"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import unionBy from 'lodash/unionBy';
import Role from '../../utils/models/Role';

import BaseField from '../forms/BaseField';
import ToggleField from '../forms/ToggleField';

export default {
  extends: BaseField,

  components: { ToggleField },

  props: ['readonly'],

  data() {
    return {
      input: {},
      modules: [],
    };
  },

  computed: {
    allPermissions() {
      const modules = this.modules.map(({ permissions }) => permissions);
      return unionBy(...modules, ({ code }) => code);
    },
  },

  methods: {
    async fetch() {
      this.modules = await Role.api
        .fetchModules()
        .then(({ data }) => data.data);
    },

    load() {
      this.isLoading = true;
      this.input = this.parse(this.value);

      this.$nextTick(() => (this.isLoading = false));
    },

    parse(input) {
      const structure = this.modules.reduce((result, module) => {
        result[module.code] = module.permissions.reduce(
          (result, permission) => {
            result[permission.code] = false;
            return result;
          },
          {}
        );
        return result;
      }, {});

      return Object.entries(input || {}).reduce(
        (result, [module, permissions]) => {
          result[module] = permissions;
          return result;
        },
        structure
      );
    },
  },

  watch: {
    value() {
      this.load();
    },

    input: {
      handler(input) {
        this.isLoading || this.$emit('input', input);
      },
      deep: true,
    },
  },

  async beforeMount() {
    await this.fetch();
    this.load();
  },
};
</script>
