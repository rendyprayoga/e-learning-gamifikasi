<template>
  <div class="d-flex min-vh-100 justify-content-center align-items-center">
    <div class="container text-center">
      <div class="display-1 text-danger mb-3"><ExclamationOctagonIcon /></div>
      <h1 class="fs-2 fw-bold text-danger">
        {{ $store.state.info.error.title }}
      </h1>
      <p>{{ $store.state.info.error.description }}</p>
    </div>
  </div>
</template>

<script>
import ExclamationOctagonIcon from 'bootstrap-icons/icons/exclamation-octagon.svg';

export default {
  components: { ExclamationOctagonIcon },
};
</script>
