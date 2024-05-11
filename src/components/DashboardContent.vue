<template>
  <div class="flex justify-center p-4">
    <div
      class="grid max-w-screen-2xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
    >
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

      <!-- START: Row 3 -->
      <!-- <DataTable class="col-span-3" :headers="headers" :items="items">
        <template #header.age="{ item }">
          <span>Years Old</span>
        </template>

        <template #item.age="{ item }">
          <span>{{ item.age }} years old</span>
        </template>
      </DataTable> -->
      <!-- END: Row 3 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import UserTable from '@/components/UserTable.vue';
import BasicImageCard from '@/components/BasicImageCard.vue';
import DataTable from '@/components/ui/DataTable.vue';

const handleClick = () => {
  console.log('btn clicked!');
};

const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Age', value: 'age' }
];

const items = [
  { name: 'Ian', age: '32' },
  { name: 'Alex', age: '30' },
  { name: 'Bella', age: '7' }
];
</script>

<style></style>
