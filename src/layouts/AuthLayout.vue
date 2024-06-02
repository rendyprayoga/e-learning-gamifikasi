<template>
  <div id="app" class="justify-content-center">
    <main
      class="flex-grow-1 flex-md-grow-0 d-flex min-vh-100 justify-content-center align-items-center p-4 p-md-5"
    >
      <div class="inner bg-white rounded-3 p-5">
        <div class="d-flex align-items-center mb-5">
          <span class="fs-5 lh-1 fw-bold ms-3" style="color: black"
            >Sign In</span
          >
        </div>

        <slot />
      </div>
    </main>

    <div class="bg d-none d-md-block flex-grow-1 position-relative"></div>

    <AlertModal />
  </div>
</template>

<script>
import AlertModal from '../components/alert/AlertModal';

export default {
  components: { AlertModal },
};
</script>

<style lang="scss" scoped>
#app {
  background: #fff3cf;
  // background-image: url('~@/assets/img/wpauth.jpg'); // Gunakan ~@ untuk mengarahkan ke src
  // background-size: cover; // Agar gambar menutupi seluruh area
  // background-repeat: no-repeat; // Agar gambar tidak berulang
  // background-position: center;
}

.bg-white {
  background-color: #e7b325 !important;
}

.inner {
  border: none;
  width: 100%;

  @include media-breakpoint-up(sm) {
    width: rem(360);
  }
}
</style>
