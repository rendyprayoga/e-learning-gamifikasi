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
              v-for="(answer, j) in shuffledAnswers(question.Answers, index)"
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
      data: [],
      responses: [],
      shuffledAnswersCache: [],
    };
  },
  mounted() {
    this.randomizeQuestions();
  },
  watch: {
    question: {
      handler(value) {
        this.data = value;
        this.randomizeQuestions();
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
        this.$alert.alert('success', 'Jawaban Berhasil disimpan', {
          onOK: () => {
            this.$router.push('/courses');
          },
        });
      } catch (error) {
        this.$alert.requestError(error);
      }
    },
    shuffle(array) {
      let currentIndex = array.length,
        randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    },
    shuffledAnswers(answers, questionIndex) {
      if (!this.shuffledAnswersCache[questionIndex]) {
        this.shuffledAnswersCache[questionIndex] = this.shuffle([...answers]);
      }
      return this.shuffledAnswersCache[questionIndex];
    },
    randomizeQuestions() {
      this.shuffledAnswersCache = [];
      const shuffledQuestions = [...this.data];
      this.data = this.shuffle(shuffledQuestions);
    },
  },
};
</script>
<style scoped>
.card {
  width: 100%;
  max-width: 28rem;
  height: auto;
  margin-top: 2rem;
  background-color: #e7b325;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.7), 0 0 6px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.card-body {
  padding: 1rem;
}

.card-title {
  text-align: center;
  font-size: 20px;
}

.btn {
  margin-top: 1rem;
}
</style>
