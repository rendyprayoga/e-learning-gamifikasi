<template>
  <QuestionForm
    :backPath="`/questions?categoryId=${$route.params.categoryId}`"
    :question="question"
  />
</template>

<script>
import Question from '../../utils/models/Questions';
import QuestionForm from '../../components/questions/QuestionForm';

export default {
  components: { QuestionForm },

  data() {
    return { question: null };
  },

  methods: {
    async fetch() {
      ({ data: this.question } = await Question.fetchByID(
        this.$route.params.id
      ));
    },
  },

  beforeMount() {
    this.fetch();
  },
};
</script>
