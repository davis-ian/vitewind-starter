<template>
  <div>
    <div class="mb-20 flex w-full flex-col text-center">
      <p class="mb-8 font-medium text-primary">Pricing</p>
      <h2
        class="mx-auto mb-8 max-w-2xl text-3xl font-bold tracking-tight lg:text-5xl"
      >
        Save hours of repetitive code, ship fast, get profitable!
      </h2>
      <p class="flex items-center justify-center gap-2 text-sm md:text-base">
        <GlowingGift />
        <span
          ><span class="text-accent">$100 off</span> for the first 940 customers
          (9 left)</span
        >
      </p>
    </div>
    <div
      class="relative flex flex-col items-center gap-8 lg:flex-row lg:items-stretch"
    >
      <!-- First Pricing Option -->
      <PricingOption :initial-price="269" :reduced-price="169">
        <template #title>
          <span>Starter</span>
        </template>
        <template #features>
          <PriceOptionFeature>NextJS boilerplate</PriceOptionFeature>
          <PriceOptionFeature>SEO &amp; Blog</PriceOptionFeature>
          <PriceOptionFeature>Mailgun emails</PriceOptionFeature>
          <PriceOptionFeature>Stripe payments</PriceOptionFeature>
          <PriceOptionFeature>MongoDB / Supabase</PriceOptionFeature>
          <PriceOptionFeature>
            Google Oauth &amp; Magic Links</PriceOptionFeature
          >
          <PriceOptionFeature> Components &amp; animations</PriceOptionFeature>
          <PriceOptionFeature :included="false">
            ChatGPT prompts for terms &amp; privacy</PriceOptionFeature
          >
          <PriceOptionFeature :included="false">
            Discord community &amp; Leaderboard</PriceOptionFeature
          >
          <PriceOptionFeature :included="false">
            Lifetime updates</PriceOptionFeature
          >
        </template>
        <template #subheader>
          <span>Pay once. Build unlimited projects!</span>
        </template>
        <template #action>
          <button class="group btn btn-primary btn-block">
            <BoltIcon />
            Get ViteFast
          </button>
        </template>
      </PricingOption>

      <!-- Suggested Pricing Option -->
      <PricingOption suggested :initial-price="269" :reduced-price="169">
        <template #title>
          <span>Starter</span>
        </template>
        <template #features>
          <PriceOptionFeature>NextJS boilerplate</PriceOptionFeature>
          <PriceOptionFeature>SEO &amp; Blog</PriceOptionFeature>
          <PriceOptionFeature>Mailgun emails</PriceOptionFeature>
          <PriceOptionFeature>Stripe payments</PriceOptionFeature>
          <PriceOptionFeature>MongoDB / Supabase</PriceOptionFeature>
          <PriceOptionFeature>
            Google Oauth &amp; Magic Links</PriceOptionFeature
          >
          <PriceOptionFeature> Components &amp; animations</PriceOptionFeature>
          <PriceOptionFeature>
            ChatGPT prompts for terms &amp; privacy</PriceOptionFeature
          >
          <PriceOptionFeature>
            Discord community &amp; Leaderboard</PriceOptionFeature
          >
          <PriceOptionFeature> Lifetime updates</PriceOptionFeature>
        </template>
        <template #subheader>
          <span>Pay once. Build unlimited projects!</span>
        </template>
        <template #action>
          <button class="group btn btn-primary btn-block">
            <BoltIcon />
            Get ViteFast
          </button>
        </template>
      </PricingOption>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlowingGift from '@/components/icons/GlowingGiftIcon.vue';
import PricingOption from '@/components/sales/PricingOption.vue';
import PriceOptionFeature from '@/components/sales/PriceOptionFeature.vue';
import BoltIcon from '@/components/icons/BoltIcon.vue';
</script>
