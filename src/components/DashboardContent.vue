<template>
  <div class="flex justify-center p-4">
    <div
      class="grid max-w-screen-2xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
    >
      <!-- START: Row 1 -->

      <CardComponent class="sm:col-span-2 md:col-span-3">
        <template #title>
          <h3 class="text-2xl font-bold">Users</h3>
        </template>
        <user-table></user-table>
      </CardComponent>
      <!-- END: Row 1 -->

      <!-- START: Row 2 -->
      <CardComponent class="sm:col-span-2 md:col-span-3">
        <h3 class="text-2xl font-bold">Todos</h3>
        <album-table></album-table>
      </CardComponent>

      <!-- END: Row 2 -->

      <!-- START: Row 2 -->
      <basic-image-card
        class="col-span-1"
        v-for="i in 3"
        :key="i"
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
import UserTable from '@/components/tables/UserTable.vue';
import BasicImageCard from '@/components/BasicImageCard.vue';
import AlbumTable from '@/components/tables/AlbumTable.vue';
import CardComponent from '@/components/ui/CardComponent.vue';

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
