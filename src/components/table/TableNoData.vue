<template>
  <div class="text-center mt-4 mt-md-5">
    <ExclamationOctagonIcon class="fs-1 mb-3" /><br />
    {{ text }}
  </div>
</template>

<script>
import ExclamationOctagonIcon from 'bootstrap-icons/icons/exclamation-octagon.svg';

export default {
  props: {
    text: {
      type: String,
      default: 'No Datas',
    },
  },
  components: { ExclamationOctagonIcon },
};
</script>
