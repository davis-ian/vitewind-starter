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
        <cta1 class="mx-auto max-w-7xl px-8 py-24"></cta1>
      </div>
      <div class="bg-base-100">
        <footer-section></footer-section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FaqComponent from '@/components/sales/FAQSection.vue';
import Pricing from '@/components/sales/PricingSection.vue';
import Hero from '@/components/layout/HeroSection.vue';
import Cta1 from '@/components/sales/CTASection.vue';
import FooterSection from '@/components/layout/FooterSection.vue';
</script>
