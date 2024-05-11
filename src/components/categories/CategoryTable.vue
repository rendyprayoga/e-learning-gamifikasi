<template>
  <div>
    <div class="table-responsive">
      <table class="table table-borderless table-hover text-nowrap">
        <thead>
          <tr style="background-color: #1d1b64; color: black">
            <th scope="col">No</th>
            <th scope="col">Kategori</th>
            <th class="text-end" scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, i) of categories" :key="category.id">
            <td>{{ getNumber(i) }}</td>
            <td>{{ category.name }}</td>
            <td class="actions text-end">
              <router-link
                v-if="$auth.user.can('categories.update')"
                class="text-reset ms-3"
                title="Ubah"
                data-bs-toggle="tooltip"
                :to="`/categories/${category.id}/edit`"
              >
                <PencilIcon />
              </router-link>
              <router-link
                v-if="$auth.user.can('questions.read')"
                class="text-reset ms-3"
                title="Question"
                data-bs-toggle="tooltip"
                :to="`/questions/${category.id}`"
              >
                <EyeIcon />
              </router-link>

              <a
                v-if="$auth.user.can('categories.delete')"
                class="text-danger ms-3"
                href="#"
                title="Hapus"
                data-bs-toggle="tooltip"
                @click.prevent="remove(category)"
              >
                <TrashIcon />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <TableLoading v-if="!categories.length && isFetching" />
    <TableNoData v-else-if="!categories.length" />

    <Pagination
      v-if="meta && meta.lastPage > 1"
      class="mt-4 mt-md-5"
      :current="meta.currentPage"
      :last="meta.lastPage"
    />
  </div>
</template>

<script>
import categories from '../../api/categories';
import hasBootstrapTooltip from '../../mixins/hasBootstrapTooltip';
import tableUtil from '../../mixins/tableUtil';
import Category from '../../utils/models/Category';

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
    // KeyIcon,
    PencilIcon,
    TrashIcon,
  },

  data() {
    return {
      isFetching: false,
      categories: [],
      meta: null,
    };
  },

  methods: {
    async fetch() {
      try {
        this.isFetching = true;
        ({ data: this.categories, meta: this.meta } = await Category.fetch(
          this.$route.query
        ));
      } finally {
        this.isFetching = false;
      }
    },

    remove(category) {
      this.$confirmation.confirm(
        `Anda ingin menghapus <b>${category.name}</b>?`,
        {
          onOK: async () => {
            try {
              await categories.delete(category.id);
              this.fetch();
              this.$alert.alert('success', 'Categorie berhasil dihapus');
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
    this.Category = Category;
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
