<template>
  <Error v-if="$store.state.info.error" />

  <component v-else-if="$route.meta.layout" :is="$route.meta.layout">
    <router-view />
  </component>

  <router-view v-else />
</template>

<script>
import Error from './views/Error';

export default {
  components: { Error },
};
</script>
