<template>
  <div>
    <CourseCard @click="getCategory" v-if="!clicked" />
    <CourseCategory :categories="categories" />
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import pickBy from 'lodash/pickBy';

import CourseCard from '../../components/courses/CourseCard';
import CourseCategory from '../../components/courses/CourseCategory';
import Category from '../../utils/models/Category';

export default {
  components: { CourseCard, CourseCategory },
  data() {
    return {
      input: { ...this.$route.query },
      clicked: false,
      categories: [],
    };
  },
  methods: {
    async fetch() {
      try {
        this.isFetching = true;
        ({ data: this.categories } = await Category.fetch(this.$route.query));
      } finally {
        this.isFetching = false;
      }
    },
    getCategory() {
      console.log('getCategory');
      this.fetch();
      this.clicked = true;
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
