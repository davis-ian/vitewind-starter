<template>
  <div class="relative w-full">
    <div class="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
      <span
        v-if="props.suggested"
        class="badge border-0 bg-primary text-xs font-semibold text-primary-content"
        >POPULAR</span
      >
    </div>
    <div
      v-if="props.suggested"
      class="absolute -inset-[1px] z-10 rounded-[8px] bg-primary"
    ></div>
    <div
      class="relative z-10 flex flex-col gap-5 rounded-lg bg-base-100 p-8 lg:gap-8"
    >
      <div class="flex items-center justify-between gap-4">
        <div><p class="text-lg font-bold lg:text-xl">All-in</p></div>
      </div>
      <div class="flex gap-2">
        <div class="mb-[4px] flex flex-col justify-end text-lg">
          <p class="relative opacity-80">
            <span
              class="absolute inset-x-0 top-[48%] h-[1.5px] bg-base-content"
            ></span
            ><span class="text-base-content">${{ props.initialPrice }}</span>
          </p>
        </div>
        <p class="text-5xl font-extrabold tracking-tight">
          ${{ props.reducedPrice }}
        </p>
        <div class="mb-[4px] flex flex-col justify-end">
          <p class="text-xs font-semibold uppercase opacity-60">USD</p>
        </div>
      </div>
      <ul class="flex-1 space-y-2.5 text-base leading-relaxed">
        <slot name="features"> </slot>
      </ul>
      <div class="space-y-2">
        <slot name="action"> </slot>
        <p
          class="relative flex items-center justify-center gap-2 text-center text-sm font-medium text-base-content/80"
        >
          <slot name="subheader"> Pay once. Build unlimited projects! </slot>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

const props = withDefaults(
  defineProps<{
    initialPrice: number;
    reducedPrice: number;
    suggested?: boolean;
  }>(),
  {
    suggested: false
  }
);
</script>
