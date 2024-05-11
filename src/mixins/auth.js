export default {
  beforeMount() {
    this.$watch('$auth.isLoggedIn', (isLoggedIn) => {
      if (isLoggedIn && this.$route.path === '/login') {
        this.$router.push('/');
      } else if (!isLoggedIn && this.$route.path !== '/login') {
        this.$router.go();
      }
    });
  },
};
