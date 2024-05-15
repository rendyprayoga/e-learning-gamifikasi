<template>
  <div>
    <div class="table-responsive">
      <table class="table table-borderless table-hover text-nowrap">
        <thead>
          <tr style="background-color: #1d1b64; color: black">
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th class="text-end" scope="col">Tindakan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(role, i) of roles" :key="role.id">
            <td>{{ getNumber(i) }}</td>
            <td>{{ role.name }}</td>
            <td class="actions text-end">
              <router-link
                v-if="$auth.user.can('roles.update')"
                class="text-reset ms-3"
                title="Edit"
                data-bs-toggle="tooltip"
                :to="`/roles/${role.id}/edit`"
              >
                <PencilIcon />
              </router-link>
              <router-link
                v-else-if="$auth.user.can('roles.read')"
                class="text-reset ms-3"
                title="View"
                data-bs-toggle="tooltip"
                :to="`/roles/${role.id}`"
              >
                <EyeIcon />
              </router-link>

              <a
                v-if="
                  $auth.user.can('roles.delete') &&
                  role.id !== $auth.user.roleId
                "
                class="text-danger ms-3"
                href="#"
                title="Delete"
                data-bs-toggle="tooltip"
                @click.prevent="remove(role)"
              >
                <TrashIcon />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <TableLoading v-if="!roles.length && isFetching" />
    <TableNoData v-else-if="!roles.length" />

    <Pagination
      v-if="meta && meta.lastPage > 1"
      class="mt-4 mt-md-5"
      :current="meta.currentPage"
      :last="meta.lastPage"
    />
  </div>
</template>

<script>
import get from 'lodash/get';
import roles from '../../api/roles';
import hasBootstrapTooltip from '../../mixins/hasBootstrapTooltip';
import tableUtil from '../../mixins/tableUtil';
import Role from '../../utils/models/Role';

import Pagination from '../pagination/Pagination';
import TableLoading from '../table/TableLoading.vue';
import TableNoData from '../table/TableNoData.vue';

import EyeIcon from 'bootstrap-icons/icons/eye.svg';
import PencilIcon from 'bootstrap-icons/icons/pencil.svg';
import TrashIcon from 'bootstrap-icons/icons/trash.svg';

export default {
  mixins: [hasBootstrapTooltip, tableUtil],

  components: {
    Pagination,
    TableLoading,
    TableNoData,
    EyeIcon,
    PencilIcon,
    TrashIcon,
  },

  data() {
    return {
      isApproving: {},
      isFetching: false,
      isRevising: {},
      isUnpublishing: {},
      meta: null,
      roles: [],
    };
  },

  methods: {
    async fetch() {
      try {
        this.isFetching = true;
        ({ data: this.roles, meta: this.meta } = await Role.fetch(
          this.$route.query
        ));
      } finally {
        this.isFetching = false;
      }
    },

    async fetchModules() {
      this.modules = await Role.api
        .fetchModules()
        .then(({ data }) => data.data);
    },

    getPermissionsHTML(role) {
      return this.modules
        .filter((module) =>
          module.permissions.some((permission) =>
            get(role.permissions, [module.code, permission.code])
          )
        )
        .map(
          (module) =>
            `${
              module.label
            } <small class="text-muted ms-1">[${module.permissions
              .filter((permission) =>
                get(role.permissions, [module.code, permission.code])
              )
              .map((permission) => permission.label)
              .join(', ')}]</small>`
        )
        .join('<br>');
    },

    remove(role) {
      this.$confirmation.confirm(`Anda ingin menghapus <b>${role.name}</b>?`, {
        onOK: async () => {
          try {
            await roles.delete(role.id);
            this.fetch();
            this.$alert.alert('success', 'Role deleted successfully');
          } catch (error) {
            this.$alert.requestError(error);
          }
        },
      });
    },
  },

  watch: {
    '$route.query': {
      handler() {
        this.fetch();
      },
      deep: true,
    },
  },

  beforeMount() {
    this.fetchModules();
    this.fetch();
  },
};
</script>

<style lang="scss" scoped>
.actions {
  .spinner-border {
    width: 1em;
    height: 1em;
  }
}
</style>
