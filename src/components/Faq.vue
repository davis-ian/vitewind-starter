<template>
  <div class="flex flex-col md:flex-row gap-12">
    <div class="flex-grow">
      <h1 class="text-3xl font-bold p-3">Frequently Asked Questions</h1>
    </div>

    <div class="flex flex-col gap-2 flex-grow">
      <div
        class="cursor-pointer"
        @click="toggleAccordionItem(index)"
        v-for="(question, index) in faqList"
      >
        <div class="collapse collapse-plus bg-base-200">
          <input type="checkbox" :checked="question.open" />
          <div class="collapse-title text-xl font-medium">{{ question.q }}</div>
          <div class="collapse-content">
            <p>{{ question.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      faqList: [
        { q: 'Click to open this one and close others', a: 'hello', open: false },
        { q: 'Click to open this one and close others', a: 'hello', open: false },
        { q: 'Click to open this one and close others', a: 'hello', open: false },
        { q: 'Click to open this one and close others', a: 'hello', open: false }
      ]
    }
  },
  methods: {
    toggleAccordionItem(index) {
      for (let i = 0; i < this.faqList.length; i++) {
        let question = this.faqList[i]

        if (i == index) {
          question.open = !question.open
        } else {
          question.open = false
        }
      }
    }
  }
}
</script>
