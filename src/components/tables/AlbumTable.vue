<template>
  <div>
    <DataTable
      :loading="loading"
      :headers="headers"
      :items="todos"
      :server-items-length="56"
      :items-per-page-options="[5, 10, 15]"
      v-model:options="options"
      size="xs"
    >
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, computed, watch, onMounted } from 'vue';
import DataTable from '@/components/ui/DataTable.vue';
import type { DataTableOptions } from '@/types/DataTableOptions';
import { useAxios } from '@/composables/useAxios';

const axios = useAxios();

const headers = [
  { text: 'Id', value: 'id', sortable: true },
  { text: 'Title', value: 'title', sortable: true },
  { text: 'Completed', value: 'completed', sortable: true }
];

const state = reactive({
  options: {
    page: 1,
    itemsPerPage: 5
  } as DataTableOptions,
  loading: true,
  todos: []
});

// Watcher for deep changes in state.options
watch(
  () => state.options, // Ensure it's a function that returns the object
  (newVal, oldVal) => {
    getAlbums();
  },
  { deep: true }
);

const getAlbums = () => {
  let paramString = `?_page=${state.options.page}&_limit=${state.options.itemsPerPage}`;

  if (state.options.sortDesc != null) {
    paramString += `&_sort=${state.options.sortBy}&_order=${state.options.sortDesc ? 'desc' : 'asc'}`;
  }

  state.loading = true;
  axios
    .get(`https://jsonplaceholder.typicode.com/todos${paramString}`, {
      params: {}
    })
    .then((response) => {
      state.todos = response.data;
      state.loading = false;
    });
};

onMounted(() => {
  getAlbums();
});

const { options, loading, todos } = toRefs(state);
</script>
<style></style>
