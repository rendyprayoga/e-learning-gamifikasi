<!-- <template>
  <div>
    <div class="table-responsive">
      <table class="table table-borderless table-hover text-nowrap">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">No Telp</th>
            <th scope="col">Register Date</th>
            <th scope="col">Point</th>
            <th scope="col">Status</th>
            <th class="text-end" scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(person, i) of people" :key="person.id">
            <td>{{ getNumber(i) }}</td>
            <td>{{ person.name }}</td>
            <td>{{ person.email }}</td>
            <td>{{ person.phone }}</td>
            <td>
              {{ moment(person.createdAt).format('DD-MM-YYYY HH:mm:ss') }}
            </td>
            <td>{{ person.point }}</td>
            <td>{{ person.isActive ? 'Active' : 'Inactive' }}</td>

            <td class="actions text-end">
              <router-link
                v-if="$auth.user.can('people.read')"
                class="text-reset ms-3"
                title="View"
                data-bs-toggle="tooltip"
                :to="`/people/${person.id}`"
              >
                <EyeIcon />
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <TableLoading v-if="!people.length && isFetching" />
    <TableNoData v-else-if="!people.length" />

    <Pagination
      v-if="meta && meta.lastPage > 1"
      class="mt-4 mt-md-5"
      :current="meta.currentPage"
      :last="meta.lastPage"
    />
  </div>
</template>

<script>
import hasBootstrapTooltip from '../../mixins/hasBootstrapTooltip';
import tableUtil from '../../mixins/tableUtil';
import People from '../../utils/models/People';

import Pagination from '../pagination/Pagination';
import TableLoading from '../table/TableLoading.vue';
import TableNoData from '../table/TableNoData.vue';

import EyeIcon from 'bootstrap-icons/icons/eye.svg';
import moment from 'moment';

export default {
  mixins: [hasBootstrapTooltip, tableUtil],

  components: {
    Pagination,
    TableLoading,
    TableNoData,
    EyeIcon,
  },

  data() {
    return {
      isFetching: false,
      people: [],
      meta: null,
    };
  },

  methods: {
    async fetch() {
      try {
        this.isFetching = true;
        ({ data: this.people, meta: this.meta } = await People.fetch(
          this.$route.query
        ));
      } finally {
        this.isFetching = false;
      }
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
    this.People = People;
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
</style> -->
