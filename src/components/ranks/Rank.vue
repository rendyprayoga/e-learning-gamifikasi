<template>
  <div>
    <!-- Podium Card Section -->
    <div class="card">
      <h1 class="title">Rank</h1>
      <div class="podium-container">
        <div class="podium">
          <div
            class="podium-item"
            v-for="(person, index) in rank"
            :key="index"
            :class="'position-' + (index + 1)"
            v-if="index < 3"
          >
            <div class="position">{{ index + 1 }}</div>
            <div class="name">{{ person.name }}</div>
            <div class="score">{{ parseInt(person.scores) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Leaderboard Table Section -->
    <div>
      <!-- Table and pagination for leaderboard -->
      <div class="table-responsive">
        <table class="table table-borderless table-hover text-nowrap">
          <thead>
            <tr style="background-color: #1d1b64; color: black">
              <th scope="col">Name</th>
              <th scope="col">Score</th>
              <th scope="col">Rank</th>
            </tr>
          </thead>
          <tbody style="background-color: #e7b325">
            <tr v-for="(data, index) in rank" :key="data.id" v-if="index > 2">
              <td>{{ data.name }}</td>
              <td>{{ data.scores }}</td>
              <td>{{ data.rank }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TableLoading v-if="!rank.length && isFetching" />
      <TableNoData v-else-if="!rank.length || rank.length < 4" />

      <Pagination
        v-if="meta && meta.lastPage > 1"
        class="mt-4 mt-md-5"
        :current="meta.currentPage"
        :last="meta.lastPage"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Rank from '../../utils/models/Rank';
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
      rank: [],
      categories: [], // Untuk menyimpan daftar kategori
      meta: null,
      selectedCategory: '', // Untuk menyimpan kategori yang dipilih
    };
  },

  methods: {
    async fetch() {
      try {
        this.isFetching = true;
        ({ data: this.rank, meta: this.meta } = await Rank.fetch(
          this.$route.query
        ));
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

<style scoped>
.card {
  background-color: rgba(15, 22, 28);
  border-radius: 15px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.7), 0 0 6px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  max-width: 50%;
  margin: 0 auto;
  margin-bottom: 20px; /* Added margin to separate cards */
}
.card-user {
  background-color: rgb(204, 100, 31);
  border-radius: 15px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.7), 0 0 6px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  max-width: 70%;
  margin: 0 auto;
  margin-bottom: 20px; /* Added margin to separate cards */
}
.title {
  color: whitesmoke;
}
.podium-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.podium {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 300px;
  margin-top: 50px;
}
.podium-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin: 0 20px;
  padding: 10px;
  color: white;
  border-radius: 10px 10px 0 0;
  width: 120px;
  text-align: center;
}
.position-1 {
  background: #d9534f;
  height: 80%;
}
.position-2 {
  background: #f0ad4e;
  height: 50%;
}
.position-3 {
  background: #5bc0de;
  height: 40%;
}
.position {
  font-size: 2em;
  margin-bottom: 10px;
}
.details-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.details {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
  text-align: center;
}
.name {
  margin-top: 10px;
  font-size: 1.2em;
  color: whitesmoke;
}
.score {
  font-size: 1em;
  color: #020202;
  font-weight: 700;
  font-size: 18px;
}
@media (max-width: 768px) {
  .podium {
    flex-direction: column;
    align-items: center;
    height: auto;
  }
  .podium-item {
    width: 70%;
    margin: 10px 0;
    height: auto;
  }
  .position {
    font-size: 1.5em;
  }
  .score {
    font-size: 1em;
  }
}

@media (max-width: 480px) {
  .podium-item {
    width: 90%;
    margin: 10px 0;
    padding: 5px;
  }
  .position {
    font-size: 1.2em;
  }
  .score {
    font-size: 0.8em;
  }
}
</style>
