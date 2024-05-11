<template>
  <UserForm :user="$auth.user" />
</template>

<script>
import UserForm from '../components/users/UserForm';

export default {
  components: { UserForm },
};
</script>
