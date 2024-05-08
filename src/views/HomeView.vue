<template>
  <div>
    <div class="text-center">
      <div class="bg-base-100">
        <hero class="py-24 px-8 mx-auto"></hero>
      </div>

      <div class="bg-base-200">
        <pricing id="pricing" class="py-24 px-8 mx-auto max-w-5xl"></pricing>
      </div>

      <div class="bg-base-100">
        <faq-component id="faq" class="py-24 px-8 max-w-7xl mx-auto"></faq-component>
      </div>

      <div class="bg-base-200">
        <cta1 class="py-24 px-8 mx-auto"></cta1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FaqComponent from '@/components/FAQ.vue'
import Pricing from '@/components/layout/Pricing.vue'
import Hero from '@/components/layout/Hero.vue'
import Cta1 from '@/components/layout/Cta1.vue'
</script>
