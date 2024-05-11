<template>
  <div>
    <h3>Pilihan Jawaban</h3>
    <h4>{{ question.questionText || 'Temp Soal' }}</h4>
    <form @submit.prevent="submit">
      <div class="row">
        <div class="col-lg-12">
          <div class="row mb-3" v-for="(input, i) of answers" :key="i">
            <div class="d-flex align-items-center">
              <div class="me-2">{{ input.code }}</div>
              <div class="col-sm-6 me-2">
                <input
                  class="form-control"
                  id="answerText"
                  v-model="input.answerText"
                  :class="{ 'is-invalid': errors.answerText }"
                />
              </div>
              <div class="col-sm-1 me-2">
                <ToggleField
                  class="form-control"
                  v-model="input.isTrue"
                  @input="selectAnswers($event, i)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <router-link
            class="btn btn-primary"
            style="margin-right: 10px"
            :to="`/questions?categoryId=${question.categoryId}`"
          >
            Kembali
          </router-link>
          <button class="btn btn-primary" :disabled="isSubmitting">
            Simpan
            <span
              v-if="isSubmitting"
              class="spinner-border spinner-border-sm ms-1"
            ></span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Answer from '../../utils/models/Answer';
import Question from '../../utils/models/Questions';

import ToggleField from '../../components/forms/ToggleField';
import answerApi from '../../api/answers';
import get from 'lodash/get';

export default {
  components: { ToggleField },
  data() {
    return {
      isSubmitting: false,
      errors: {},
      question: {},
      answersData: [],
      answers: [
        {
          code: 'A',
          id: null,
          answerText: '',
          questionId: this.$route.params.id,
          isTrue: false,
        },
        {
          code: 'B',
          id: null,
          questionId: this.$route.params.id,
          answerText: '',
          isTrue: false,
        },
        {
          code: 'C',
          id: null,
          questionId: this.$route.params.id,
          answerText: '',
          isTrue: false,
        },
        {
          code: 'D',
          id: null,
          questionId: this.$route.params.id,
          answerText: '',
          isTrue: false,
        },
      ],
    };
  },
  methods: {
    async submit() {
      try {
        this.errors = {};
        this.isSubmitting = true;
        await answerApi.create({ data: this.answers });
        await this.fetch();
        this.$alert.alert('success', 'Jawaban berhasil disimpan', {
          onOK: () => {},
        });
      } catch (error) {
        this.errors = get(error, 'response.data.error.errors', {});
        this.$alert.requestError(error);
      } finally {
        this.isSubmitting = false;
      }
    },
    async selectAnswers(e, idx) {
      this.answers = this.answers.map((value, index) => {
        value.isTrue = false;
        if (index == idx) {
          value.isTrue = e;
        }
        return value;
      });
    },
    async fetch() {
      ({ data: this.question } = await Question.fetchByID(
        this.$route.params.id
      ));
      ({ data: this.answersData } = await Answer.fetchByID(
        this.$route.params.id
      ));
      if (this.answersData.length) {
        this.answers = this.answersData.map((value, index) => {
          return { ...this.answers[index], ...value };
        });
      }
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>
