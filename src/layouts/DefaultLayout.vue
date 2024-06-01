<template>
  <div id="app">
    <Sidebar />

    <main class="d-flex flex-column min-vh-100">
      <div class="container flex-grow-1 d-flex flex-column p-4 py-md-5 px-xl-5">
        <slot />
      </div>
    </main>

    <AlertModal />
    <ConfirmationModal />
  </div>
</template>

<script>
import AlertModal from '../components/alert/AlertModal';
import ConfirmationModal from '../components/alert/ConfirmationModal';
import Sidebar from '../components/layout/Sidebar';

export default {
  components: { AlertModal, ConfirmationModal, Sidebar },
};
</script>

<style lang="scss" scoped>
main {
  background-color: rgba($bg-primary, 0.7);
  margin-left: rem(70);
  position: relative;
  background-image: url('~@/assets/img/wpauth.jpg'); // Gunakan ~@ untuk mengarahkan ke src
  background-size: cover; // Agar gambar menutupi seluruh area
  background-repeat: no-repeat; // Agar gambar tidak berulang
  background-position: center;
  @include media-breakpoint-up(xl) {
    margin-left: rem(280);
  }
}
</style>
