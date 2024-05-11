<template>
  <div>
    <CourseQuestion :question="questions" />
  </div>
</template>
<script>
import CourseQuestion from '../../components/courses/CourseQuestion';
import Questions from '../../utils/models/Questions';
export default {
  components: { CourseQuestion },
  data() {
    return {
      questions: [],
    };
  },
  methods: {
    async fetch() {
      try {
        this.isFetching = true;
        ({ data: this.questions } = await Questions.fetchByID(
          `student/${this.$route.params.idCategory}`
        ));
      } finally {
        this.isFetching = false;
      }
    },
    // getCategory() {
    //   console.log('getCategory');
    //   this.fetch();
    //   this.clicked = true;
    // },
    // push() {
    //   let query = { ...this.$route.query, ...this.input };
    //   query = pickBy(query, (value) => value !== '');

    //   this.$router.replace({ query });
    // },
  },
  created() {
    this.fetch();
  },
};
</script>
