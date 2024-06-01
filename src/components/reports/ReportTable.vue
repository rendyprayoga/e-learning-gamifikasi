<template>
  <div>
    <!-- Dropdown to select category -->
    <div class="d-flex flex-wrap  mb-md-2"">
      <div class="me-auto" >
      <label for="category">Category</label>
      <select
        id="category"
        class="form-control"
        v-model="selectedCategory"
        @change="onCategoryChange"
      >
        <option value="">All</option>
        <!-- Untuk menampilkan semua data tanpa filter -->
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      </div>
    </div>

    <!-- Table and pagination for leaderboard -->
    <div class="table-responsive">
      <table class="table table-borderless table-hover text-nowrap">
        <thead>
          <tr style="background-color: #1d1b64; color: black">
            <th scope="col">Rank</th>
            <th scope="col">Name</th>
            <th scope="col">Score</th>
            <th scope="col">Category</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody style="background-color: #e7b325;">
          <tr v-for="(data, index) in filteredSortedReport" :key="data.id">
            <!-- <td>{{ index + 1 }}</td> -->
             <td>{{ data.rank }}</td>
            <td>{{ data.User.name }}</td>
            <td>{{ data.score }}</td>
            <td>{{ data.Category.name }}</td>
            <td>{{ moment(data.createdAt).format('DD-MM-YYYY HH:mm:ss') }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <TableLoading v-if="!filteredSortedReport.length && isFetching" />
    <TableNoData v-else-if="!filteredSortedReport.length" />

    <Pagination
      v-if="meta && meta.lastPage > 1"
      class="mt-4 mt-md-5"
      :current="meta.currentPage"
      :last="meta.lastPage"
    />
  </div>
</template>

<script>
import moment from 'moment';
import Report from '../../utils/models/Report';
import Category from '../../utils/models/Category';
import Pagination from '../pagination/Pagination';
import TableLoading from '../table/TableLoading.vue';
import TableNoData from '../table/TableNoData.vue';

export default {
  components: {
    Pagination,
    TableLoading,
    TableNoData,
  },

  data() {
    return {
      isFetching: false,
      report: [],
      categories: [], // Untuk menyimpan daftar kategori
      meta: null,
      selectedCategory: '', // Untuk menyimpan kategori yang dipilih
    };
  },

  computed: {
     filteredSortedReport() {
      // Filter data berdasarkan kategori yang dipilih
      let data = this.report;
      if (this.selectedCategory !== '') {
        data = data.filter(
          (item) => item.Category.id === this.selectedCategory
        );
      }

      // Sortir berdasarkan skor dan penilaian rank
      data = data.sort((a, b) => b.score - a.score);
      let rank = 1;

      return data.map((item, index, arr) => {
        if (index > 0 && arr[index - 1].score > item.score) {
          rank = index + 1;
        }
        return {
          ...item,
          rank,
        };
      });
    },
  },

  methods: {
    async fetch() {
      try {
        this.isFetching = true;
        const [reportResult, categoryResult] = await Promise.all([
          Report.fetch(this.$route.query),
          Category.fetch(), // Mendapatkan semua kategori
        ]);
        this.report = reportResult.data;
        this.meta = reportResult.meta;
        this.categories = categoryResult.data; // Simpan daftar kategori
      } catch (error) {
        console.error('Error fetching data:', error); // Debug jika ada kesalahan
      } finally {
        this.isFetching = false;
      }
    },

    onCategoryChange() {
      // Fetch lagi dengan query kategori yang dipilih
      this.fetch();
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
    this.fetch();
  },

  beforeCreate() {
    this.moment = moment;
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
