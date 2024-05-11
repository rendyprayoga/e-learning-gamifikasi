<template>
  <form @submit.prevent="submit">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-sm-10">
            <div class="mb-3">
              <label class="form-label" for="question">Pertanyaan</label>
              <input
                class="form-control"
                id="questionText"
                v-model="input.questionText"
                :class="{ 'is-invalid': errors.questionText }"
                :readonly="readonly"
              />
              <div class="invalid-feedback">
                {{ errors.questionText }}
              </div>
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
          :to="`/questions?categoryId=${this.$route.params.categoryId}`"
        >
          Kembali
        </router-link>
        <button
          class="btn btn-primary"
          :disabled="isSubmitting"
          v-if="!readonly"
        >
          Simpan
          <span
            v-if="isSubmitting"
            class="spinner-border spinner-border-sm ms-1"
          ></span>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import get from 'lodash/get';
import questions from '../../api/questions';
// import Question from '../../utils/models/Questions';
import routerUtil from '../../mixins/routerUtil';

export default {
  mixins: [routerUtil],

  props: ['backPath', 'readonly', 'question'],

  data() {
    return {
      errors: {},
      input: {},
      isSubmitting: false,
    };
  },

  methods: {
    async submit() {
      try {
        this.errors = {};
        this.isSubmitting = true;
        this.input.categoryId = this.$route.params.categoryId;
        const input = this.input;
        // console.log(input);
        if (this.input.id) {
          await questions.update(input);
        } else {
          await questions.create(input);
        }

        this.$alert.alert('success', 'Pertanyaan berhasil disimpan', {
          onOK: () => {
            this.backPath && this.back(this.backPath);
          },
        });
      } catch (error) {
        this.errors = get(error, 'response.data.error.errors', {});
        this.$alert.requestError(error);
      } finally {
        this.isSubmitting = false;
      }
    },
  },

  watch: {
    question: {
      handler(question) {
        if (question) {
          console.log(question);
          this.input = { ...this.input, ...question.toJSON() };
        }
      },
      immediate: true,
    },
  },
};
</script>
