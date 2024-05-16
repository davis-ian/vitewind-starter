<template>
  <div class="card card-compact bg-base-100 shadow-xl">
    <figure>
      <img v-if="imageSrc" :src="imageSrc" :alt="title" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <p>{{ body }}</p>
      <div class="card-actions justify-end">
        <button @click="$emit('btn-click')" class="btn btn-primary">{{ btnText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  body: string
  btnText: string
  imageSrc: string
}>()
</script>
