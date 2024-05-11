<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="card-container">
        <div class="card" v-for="(question, index) in data" :key="question.id">
          <div class="card-body">
            <h5 class="card-title">
              {{ index + 1 }}. {{ question.questionText }}
            </h5>
            <div
              class="form-check"
              v-for="(answer, j) in question.Answers"
              :key="answer.id"
            >
              <input
                class="form-check-input"
                type="radio"
                :name="'question-' + question.id"
                :id="`answer-${answer.id}`"
                :value="{ id: question.id, answer: answer.id }"
                v-model="responses[index]"
              />
              <label class="form-check-label" :for="`answer-${answer.id}`">
                {{ String.fromCharCode(97 + j) }}. {{ answer.answerText }}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import questions from '../../api/questions';

export default {
  props: {
    question: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      data: this.question,
      responses: [],
    };
  },
  watch: {
    question: {
      handler(value) {
        this.data = value;
      },
      deep: true,
    },
  },
  methods: {
    async handleSubmit() {
      // Validasi jika semua pertanyaan terjawab
      if (this.data.length != this.responses.length) {
        this.$alert.requestError({ message: 'Isi semua jawaban' });
        return;
      }
      try {
        await questions.saveExamp(
          this.$route.params.idCategory,
          this.responses
        );
        this.$alert.alert('success', 'Jawban Berhasil disimpan', {
          onOK: () => {
            this.$router.push('/courses');
          },
        });
      } catch (error) {
        this.$alert.requestError(error);
      }
    },
  },
};
</script>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.card {
  background-color: #e8c872;
  border-radius: 10px;
  padding: 1rem;
}

.card-title {
  text-align: start;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
}

.btn {
  margin-top: 1rem;
}
</style>
