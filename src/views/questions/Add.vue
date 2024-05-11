<template>
  <QuestionForm
    :backPath="`/questions?categoryId=${$route.params.categoryId}`"
  />
</template>

<script>
import QuestionForm from '../../components/questions/QuestionForm';

export default {
  components: { QuestionForm },
};
</script>
