<template>
  <ReportTable />
</template>

<script>
import debounce from 'lodash/debounce';
import pickBy from 'lodash/pickBy';

import report from '../../api/reports';
import ReportTable from '../../components/reports/ReportTable.vue';
import CourseQuestion from '../../components/courses/CourseQuestion.vue';

export default {
  components: { ReportTable, CourseQuestion },

  data() {
    return { input: { ...this.$route.query }, isExporting: false };
  },

  methods: {
    async handleExportClick() {
      try {
        this.isExporting = true;
        const response = await report.fetchExportUrl({
          ...this.$route.query,
        });
        location.href = response.data.data.url;
      } catch (error) {
        this.$alert.requestError(error);
      } finally {
        this.isExporting = false;
      }
    },
    push() {
      let query = { ...this.$route.query, ...this.input };
      query = pickBy(query, (value) => value !== '');

      this.$router.replace({ query });
    },
  },

  watch: {
    input: {
      handler() {
        this.pushDebounced();
      },
      deep: true,
    },
  },

  created() {
    this.pushDebounced = debounce(this.push, 400);
  },
};
</script>
