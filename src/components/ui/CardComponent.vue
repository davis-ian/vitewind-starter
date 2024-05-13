<template>
  <!-- <div class="card col-span-1 shadow-xl sm:col-span-2 md:col-span-3">
    <div :class="['card-body rounded-xl border-2 border-accent', bgClass]">
      <slot name="title"></slot>

      <slot></slot>
    </div>
  </div> -->

  <div class="card shadow-xl">
    <div class="card-body">
      <h2 v-if="$slots.title" class="card-title">
        <slot name="title"> </slot>
      </h2>

      <slot> </slot>
      <slot name="actions"> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  bgClass: {
    type: String,
    default: ''
  }
});
</script>
