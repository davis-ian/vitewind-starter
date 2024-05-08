<template>
  <div class="flex flex-col md:flex-row gap-12">
    <div class="flex-grow">
      <h1 class="text-3xl font-bold p-3">Frequently Asked Questions</h1>
    </div>

    <div class="flex flex-col gap-2 flex-grow">
      <div
        class="cursor-pointer"
        @click="toggleAccordionItem(index)"
        v-for="(question, index) in questions"
      >
        <div class="collapse collapse-plus bg-base-200">
          <input type="checkbox" :checked="question.open" />
          <div class="collapse-title text-xl font-medium">{{ question.question }}</div>
          <div class="collapse-content">
            <p>{{ question.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'

import type { FAQ } from '@/types/FAQ'

const state = reactive<{ questions: FAQ[] }>({
  questions: [
    { question: 'Click to open this one and close others', answer: 'hello', open: false },
    { question: 'Click to open this one and close others', answer: 'hello', open: false },
    { question: 'Click to open this one and close others', answer: 'hello', open: false },
    { question: 'Click to open this one and close others', answer: 'hello', open: false }
  ]
})

const toggleAccordionItem = (index: number) => {
  for (let i = 0; i < state.questions.length; i++) {
    let question = state.questions[i]

    if (i == index) {
      question.open = !question.open
    } else {
      question.open = false
    }
  }
}

const { questions } = toRefs(state)
</script>
