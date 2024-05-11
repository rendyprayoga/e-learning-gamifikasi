<template>
  <div>
    <div class="table-responsive">
      <table class="table table-borderless table-hover text-nowrap">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">key</th>
            <th scope="col">settingType</th>
            <th scope="col">value</th>
            <th class="text-end" scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(setting, i) of settings" :key="setting.id">
            <td>{{ getNumber(i) }}</td>
            <td>{{ setting.key }}</td>
            <td>{{ setting.settingType }}</td>
            <td>{{ setting.type === 'string' ? '-' : setting.value }}</td>
            <td class="actions text-end">
              <router-link
                v-if="$auth.user.can('rewards.update')"
                class="text-reset ms-3"
                title="Edit"
                data-bs-toggle="tooltip"
                :to="`/settings/${setting.id}/edit`"
              >
                <PencilIcon />
              </router-link>
              <router-link
                v-else-if="$auth.user.can('rewards.read')"
                class="text-reset ms-3"
                title="View"
                data-bs-toggle="tooltip"
                :to="`/settings/${setting.id}`"
              >
                <EyeIcon />
              </router-link>

              <a
                v-if="$auth.user.can('settings.delete')"
                class="text-danger ms-3"
                href="#"
                title="Delete"
                data-bs-toggle="tooltip"
                @click.prevent="remove(setting)"
              >
                <TrashIcon />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <TableLoading v-if="!settings.length && isFetching" />
    <TableNoData v-else-if="!settings.length" />

    <Pagination
      v-if="meta && meta.lastPage > 1"
      class="mt-4 mt-md-5"
      :current="meta.currentPage"
      :last="meta.lastPage"
    />
  </div>
</template>

<script>
import settings from '../../api/settings';
import hasBootstrapTooltip from '../../mixins/hasBootstrapTooltip';
import tableUtil from '../../mixins/tableUtil';
import Settings from '../../utils/models/Setting';

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
      settings: [],
      meta: null,
    };
  },

  methods: {
    async fetch() {
      try {
        this.isFetching = true;
        ({ data: this.settings, meta: this.meta } = await Settings.fetch(
          this.$route.query
        ));
      } finally {
        this.isFetching = false;
      }
    },

    remove(setting) {
      this.$confirmation.confirm(
        `Anda ingin menghapus <b>${setting.key}</b>?`,
        {
          onOK: async () => {
            try {
              await settings.delete(setting.id);
              this.fetch();
              this.$alert.alert('success', 'Settings deleted successfully');
            } catch (error) {
              this.$alert.requestError(error);
            }
          },
        }
      );
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
    this.Settings = Settings;
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
