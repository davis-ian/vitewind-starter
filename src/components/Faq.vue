<template>
  <div class="flex flex-col md:flex-row gap-12">
    <div class="flex-grow">
      <h1 class="text-3xl toex-bold p-3">Frequently Asked Questions</h1>
    </div>

    <div class="flex flex-col gap-2 flex-grow">
      <div @click="toggleAccordionItem(question)" v-for="(question, index) in faqList">
        <div class="collapse collapse-plus bg-base-200">
          <input type="checkbox" name="my-accordion-3" v-model="question.open" />
          <div class="collapse-title text-xl font-medium">{{ question.q }}</div>
          <div class="collapse-content">
            <p>{{ question.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    toggleAccordionItem(question) {
      this.closeOpenItems()
      question.open = !question.open
    },
    closeOpenItems() {
      var openItems = this.faqList.filter((x) => x.open)

      openItems.forEach((x) => {
        x.open = false
      })
    }
  }
}
</script>
