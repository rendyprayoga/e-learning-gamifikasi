<template>
  <div>
    <h1>Edit Data Settings</h1>
    <SettingForm backPath="/settings" :setting="setting" />
  </div>
</template>

<script>
import Settings from '../../utils/models/Setting';

import SettingForm from '../../components/settings/SettingForm';

export default {
  components: { SettingForm },

  data() {
    return { setting: null };
  },

  methods: {
    async fetch() {
      ({ data: this.setting } = await Settings.fetchByID(
        this.$route.params.id
      ));
    },
  },

  beforeMount() {
    this.fetch();
  },
};
</script>
