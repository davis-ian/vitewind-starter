<template>
  <div class="flex justify-center p-4">
    <div class="max-w-screen-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <!-- START: Row 1 -->
      <user-table class="col-span-1 sm:col-span-2 md:col-span-3"></user-table>
      <!-- END: Row 1 -->

      <!-- START: Row 2 -->

      <basic-image-card
        class="col-span-1"
        v-for="i in 3"
        :title="`Shoes ${i}!`"
        :body="'Check out these awesome shoes!'"
        :btn-text="'Buy Now'"
        image-src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
        @btn-click="handleClick"
      ></basic-image-card>
      <!-- END: Row2 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import UserTable from '@/components/UserTable.vue'
import BasicImageCard from '@/components/BasicImageCard.vue'

const handleClick = () => {
  console.log('btn clicked!')
}
</script>

<style></style>
