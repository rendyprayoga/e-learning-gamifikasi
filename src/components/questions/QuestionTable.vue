<template>
  <div>
    <div class="table-responsive">
      <table class="table table-borderless table-hover text-black">
        <thead>
          <tr style="background-color: #1d1b64; color: black">
            <th scope="col">No</th>
            <th scope="col">Pertanyaan</th>
            <th class="text-end" scope="col">Tindakan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(question, i) of questionsData" :key="question.id">
            <td>{{ getNumber(i) }}</td>
            <td>{{ question.questionText }}</td>
            <td class="actions text-end">
              <router-link
                v-if="$auth.user.can('questions.update')"
                class="text-reset ms-3"
                title="Ubah"
                data-bs-toggle="tooltip"
                :to="`/questions/${question.categoryId}/${question.id}/edit`"
              >
                <PencilIcon />
              </router-link>
              <router-link
                v-if="$auth.user.can('questions.read')"
                class="text-reset ms-3"
                title="Answers"
                data-bs-toggle="tooltip"
                :to="`/questions/answers/${question.id}`"
              >
                <ListCheckIcon />
              </router-link>
              <a
                v-if="$auth.user.can('questions.delete')"
                class="text-danger ms-3"
                href="#"
                title="Hapus"
                data-bs-toggle="tooltip"
                @click.prevent="remove(question)"
              >
                <TrashIcon />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <TableLoading v-if="!questionsData.length && isFetching" />
    <TableNoData
      v-else-if="!questionsData.length"
      :text="categoryId ? 'No data' : 'Pilih Kategori'"
    />

    <Pagination
      v-if="meta && meta.lastPage > 1"
      class="mt-4 mt-md-5"
      :current="meta.currentPage"
      :last="meta.lastPage"
    />
  </div>
</template>

<script>
import questions from '../../api/questions';
import Question from '../../utils/models/Questions';

import hasBootstrapTooltip from '../../mixins/hasBootstrapTooltip';
import tableUtil from '../../mixins/tableUtil';

import Pagination from '../pagination/Pagination';
import TableLoading from '../table/TableLoading.vue';
import TableNoData from '../table/TableNoData.vue';

import ListCheckIcon from 'bootstrap-icons/icons/list-check.svg';
import PencilIcon from 'bootstrap-icons/icons/pencil.svg';
import TrashIcon from 'bootstrap-icons/icons/trash.svg';

export default {
  mixins: [hasBootstrapTooltip, tableUtil],
  props: ['categoryId'],
  components: {
    Pagination,
    TableLoading,
    TableNoData,
    ListCheckIcon,
    PencilIcon,
    TrashIcon,
  },

  data() {
    return {
      isFetching: false,
      meta: null,
      questionsData: [],
    };
  },

  methods: {
    async fetch() {
      try {
        this.isFetching = true;
        ({ data: this.questionsData, meta: this.meta } = await Question.fetch({
          ...this.$route.query,
        }));
      } finally {
        this.isFetching = false;
      }
    },

    remove(question) {
      this.$confirmation.confirm(
        `Anda ingin menghapus <b>${question.questionText}</b>?`,
        {
          onOK: async () => {
            try {
              await questions.delete(question.id);
              this.fetch();
              this.$alert.alert('success', 'Pertanyaan berhasil dihapus');
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
    this.Question = Question;
    if (this.categoryId) {
      this.fetch();
    } else {
      this.questionsData = [];
    }
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
