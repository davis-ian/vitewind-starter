<template>
  <li
    class="flex items-center gap-2"
    :class="props.included ? '' : 'text-base-content/30'"
  >
    <CheckMarkIcon v-if="props.included" />
    <XIcon v-else />
    <span>
      <slot> </slot>
    </span>
  </li>
</template>

<script setup lang="ts">
import CheckMarkIcon from '@/components/icons/CheckMarkIcon.vue';
import XIcon from '@/components/icons/XIcon.vue';

import { defineProps, withDefaults } from 'vue';

const props = withDefaults(
  defineProps<{
    included?: boolean;
  }>(),
  {
    included: true
  }
);
</script>
