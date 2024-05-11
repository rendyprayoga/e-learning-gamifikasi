<template>
  <div>
    <div class="table-responsive">
      <table class="table table-borderless table-hover text-nowrap">
        <thead>
          <tr style="background-color: #1d1b64; color: black">
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th class="text-end" scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(api, i) of apis" :key="api.id">
            <td>{{ getNumber(i) }}</td>
            <td>{{ api.name }}</td>
            <td class="actions text-end">
              <router-link
                v-if="$auth.user.can('apis.update')"
                class="text-reset ms-3"
                title="Edit"
                data-bs-toggle="tooltip"
                :to="`/apis/${api.id}/edit`"
              >
                <PencilIcon />
              </router-link>

              <router-link
                v-else-if="$auth.user.can('apis.read')"
                class="text-reset ms-3"
                title="View"
                data-bs-toggle="tooltip"
                :to="`/apis/${api.id}`"
              >
                <EyeIcon />
              </router-link>

              <a
                v-if="$auth.user.can('apis.delete')"
                class="text-danger ms-3"
                href="#"
                title="Delete"
                data-bs-toggle="tooltip"
                @click.prevent="remove(api)"
              >
                <TrashIcon />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <TableLoading v-if="!apis.length && isFetching" />
    <TableNoData v-else-if="!apis.length" />

    <Pagination
      v-if="meta && meta.lastPage > 1"
      class="mt-4 mt-md-5"
      :current="meta.currentPage"
      :last="meta.lastPage"
    />
  </div>
</template>

<script>
import apis from '../../api/apis';
import hasBootstrapTooltip from '../../mixins/hasBootstrapTooltip';
import tableUtil from '../../mixins/tableUtil';
import API from '../../utils/models/API';

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
    return { apis: [], isFetching: false, meta: null };
  },

  methods: {
    async fetch() {
      try {
        this.isFetching = true;
        ({ data: this.apis, meta: this.meta } = await API.fetch(
          this.$route.query
        ));
      } finally {
        this.isFetching = false;
      }
    },

    remove(api) {
      this.$confirmation.confirm(`Anda ingin menghapus <b>${api.name}</b>?`, {
        onOK: async () => {
          try {
            await apis.delete(api.id);
            this.$store.commit('apis/invalidate');
            this.fetch();
            api.$delete();
            this.$alert.alert('success', 'API deleted successfully');
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
