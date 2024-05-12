<template>
  <div>
    <div class="text-center">
      <div class="bg-base-100">
        <hero class="mx-auto px-8 py-24"></hero>
      </div>

      <div class="bg-base-200">
        <pricing id="pricing" class="mx-auto max-w-5xl px-8 py-24"></pricing>
      </div>

      <div class="bg-base-100">
        <faq-component
          id="faq"
          class="mx-auto max-w-7xl px-8 py-24"
        ></faq-component>
      </div>

      <div class="bg-base-200">
        <footer-section></footer-section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FaqComponent from '@/components/Faq.vue';
import Pricing from '@/components/layout/Pricing.vue';
import Hero from '@/components/layout/Hero.vue';
import Cta1 from '@/components/layout/Cta1.vue';
import FooterSection from '@/components/layout/FooterSection.vue';
</script>
