<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li v-if="current > 1" class="page-item">
        <router-link
          class="page-link"
          :to="{ query: { ...$route.query, _page: current - 1 } }"
        >
          <ChevronLeftIcon />
        </router-link>
      </li>
      <li
        v-for="number of numbers"
        class="page-item"
        :class="{ active: number === current, disabled: number === '...' }"
        :key="number"
      >
        <span v-if="number === '...'" class="page-link">&hellip;</span>
        <span v-else-if="number === current" class="page-link">{{
          number
        }}</span>
        <router-link
          v-else
          class="page-link"
          :to="{ query: { ...$route.query, _page: number } }"
        >
          {{ number }}
        </router-link>
      </li>
      <li v-if="current < last" class="page-item">
        <router-link
          class="page-link"
          :to="{ query: { ...$route.query, _page: current + 1 } }"
        >
          <ChevronRightIcon />
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import ChevronLeftIcon from 'bootstrap-icons/icons/chevron-left.svg';
import ChevronRightIcon from 'bootstrap-icons/icons/chevron-right.svg';

export default {
  components: { ChevronLeftIcon, ChevronRightIcon },

  props: ['current', 'last'],

  methods: {
    /**
     * https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
     *
     * @param {Number} c Current page.
     * @param {Number} l Last page.
     */
    generateNumbers(c, m) {
      var current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

      for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || (i >= left && i < right)) {
          range.push(i);
        }
      }

      for (let i of range) {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
            rangeWithDots.push('...');
          }
        }
        rangeWithDots.push(i);
        l = i;
      }

      return rangeWithDots;
    },
  },

  computed: {
    numbers() {
      return this.generateNumbers(this.current, this.last);
    },
  },
};
</script>

<style lang="scss" scoped>
$pagination-color: $body-color;

@import '../../../node_modules/bootstrap/scss/pagination';
</style>
