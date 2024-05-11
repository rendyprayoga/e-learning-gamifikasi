<template>
  <CategoryForm backPath="/categories" :category="category" />
</template>

<script>
import Category from '../../utils/models/Category';

import CategoryForm from '../../components/categories/CategoryForm';

export default {
  components: { CategoryForm },

  data() {
    return { category: null };
  },

  methods: {
    async fetch() {
      ({ data: this.category } = await Category.fetchByID(
        this.$route.params.id
      ));
    },
  },

  beforeMount() {
    this.fetch();
  },
};
</script>
