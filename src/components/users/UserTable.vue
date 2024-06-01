<template>
  <div>
    <div class="table-responsive">
      <table class="table table-borderless table-hover text-nowrap">
        <thead>
          <tr style="background-color: #1d1b64; color: black">
            <th scope="col">No</th>
            <th scope="col">Nama Lengkap</th>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
            <th class="text-end" scope="col">Tindakan</th>
          </tr>
        </thead>
        <tbody style="background-color: #e7b325">
          <tr v-for="(user, i) of users" :key="user.id">
            <td>{{ getNumber(i) }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.get('Role.name') }}</td>
            <td class="actions text-end">
              <!-- <router-link
                class="text-info ms-3"
                title="Reset Password"
                data-bs-toggle="tooltip"
                v-if="$auth.user.can('users.update')"
                :to="`/users/${user.id}/reset-password`"
              >
                <KeyIcon />
              </router-link> -->

              <router-link
                v-if="$auth.user.can('users.update')"
                class="text-reset ms-3"
                title="Edit"
                data-bs-toggle="tooltip"
                :to="`/users/${user.id}/edit`"
              >
                <PencilIcon />
              </router-link>
              <router-link
                v-else-if="$auth.user.can('users.read')"
                class="text-reset ms-3"
                title="View"
                data-bs-toggle="tooltip"
                :to="`/users/${user.id}`"
              >
                <EyeIcon />
              </router-link>

              <a
                v-if="
                  $auth.user.can('users.delete') && user.id !== $auth.user.id
                "
                class="text-danger ms-3"
                href="#"
                title="Delete"
                data-bs-toggle="tooltip"
                @click.prevent="remove(user)"
              >
                <TrashIcon />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <TableLoading v-if="!users.length && isFetching" />
    <TableNoData v-else-if="!users.length" />

    <Pagination
      v-if="meta && meta.lastPage > 1"
      class="mt-4 mt-md-5"
      :current="meta.currentPage"
      :last="meta.lastPage"
    />
  </div>
</template>

<script>
import users from '../../api/users';
import hasBootstrapTooltip from '../../mixins/hasBootstrapTooltip';
import tableUtil from '../../mixins/tableUtil';
import User from '../../utils/models/User';

import Pagination from '../pagination/Pagination';
import TableLoading from '../table/TableLoading.vue';
import TableNoData from '../table/TableNoData.vue';

import EyeIcon from 'bootstrap-icons/icons/eye.svg';
// import KeyIcon from 'bootstrap-icons/icons/key.svg';
import PencilIcon from 'bootstrap-icons/icons/pencil.svg';
import TrashIcon from 'bootstrap-icons/icons/trash.svg';

export default {
  mixins: [hasBootstrapTooltip, tableUtil],

  components: {
    Pagination,
    TableLoading,
    TableNoData,
    EyeIcon,
    // KeyIcon,
    PencilIcon,
    TrashIcon,
  },

  data() {
    return {
      isFetching: false,
      users: [],
      meta: null,
    };
  },

  methods: {
    async fetch() {
      try {
        this.isFetching = true;
        ({ data: this.users, meta: this.meta } = await User.fetch(
          this.$route.query
        ));
      } finally {
        this.isFetching = false;
      }
    },

    remove(user) {
      this.$confirmation.confirm(`Anda ingin menghapus <b>${user.name}</b>?`, {
        onOK: async () => {
          try {
            await users.delete(user.id);
            this.fetch();
            this.$alert.alert('success', 'User deleted successfully');
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

  created() {
    this.User = User;
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
