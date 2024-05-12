<template>
  <div>
    <div
      class="card card-compact col-span-1 bg-base-100 shadow-xl sm:col-span-2 md:col-span-3"
    >
      <div class="card-body">
        <slot name="title"></slot>

        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
