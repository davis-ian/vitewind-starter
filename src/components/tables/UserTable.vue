<template>
  <div>
    <DataTable
      selectable
      :loading="loading"
      :headers="headers"
      :items="users"
      :server-items-length="56"
      :items-per-page-options="[5, 10, 15]"
      v-model:options="options"
    >
      <template #item.name="{ item }">
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="mask mask-squircle h-12 w-12">
              <img
                :src="item.picture.thumbnail"
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div class="font-bold">
              {{ item.name.first }} {{ item.name.last }}
            </div>
            <div>
              {{ item.login.username }}
            </div>
            <div class="text-sm opacity-50">{{ item.country }}</div>
          </div>
        </div>
      </template>

      <template #item.location="{ item }">
        <div>{{ item.location.city }}</div>
        <div class="font-bold">{{ item.location.country }}</div>
      </template>

      <template #item.details="{ item }">
        <button @click="openDetails(item as User)" class="btn btn-ghost btn-xs">
          details
        </button>
      </template>
    </DataTable>

    <Modal v-model="detailsModal">
      <template #default>
        <h3 class="mb-4 text-3xl font-bold">User Details</h3>
        <div style="max-height: 50vh" class="p-4">
          <div class="">
            <pre><code>{{ selectedUser }}</code></pre>
          </div>
        </div>
      </template>

      <template #actions>
        <div>
          <button class="btn btn-accent" @click="detailsModal = false">
            Close
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, computed, watch, onMounted } from 'vue';
import DataTable from '@/components/ui/DataTable.vue';
import Modal from '@/components/ui/ModalComponent.vue';
import type { DataTableOptions } from '@/types/DataTableOptions';
import axiosInstance from '@/services/axiosConfig';

interface Header {
  sortable: any;
  text: string;
  value: string;
  selectable?: boolean | false;
}

const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Email', value: 'email' },
  { text: 'Location', value: 'location' },
  { text: 'Details', value: 'details' }
] as Header[];

interface User {
  id: string;
  name: {
    first: string;
    last: string;
  };
  picture: {
    thumbnail: string;
  };
  location: {
    country: string;
    city: string;
  };
  login: {
    username: string;
  };
  selected?: boolean;
}

const state = reactive({
  options: {
    page: 1,
    itemsPerPage: 5
  } as DataTableOptions,
  loading: true,
  users: [] as User[],
  allUsersSelected: false,
  detailsModal: false,
  selectedUser: null as User | null
});

const selectedUsers = computed(() => {
  return state.users.filter((user) => user.selected);
});

watch(selectedUsers, (newVal, oldVal) => {
  if (newVal.length == 0) {
    state.allUsersSelected = false;
  }

  if (newVal.length == state.users.length) {
    state.allUsersSelected = true;
  }
});

// Watcher for deep changes in state.options
watch(
  () => state.options, // Ensure it's a function that returns the object
  (newVal, oldVal) => {
    getUsers();
  },
  { deep: true }
);

const openDetails = (user: User) => {
  state.selectedUser = user;
  state.detailsModal = true;
};

const getUsers = () => {
  state.loading = true;
  axiosInstance
    .get('https://randomuser.me/api/', {
      params: {
        seed: 'abc',
        page: state.options.page,
        results: state.options.itemsPerPage
      }
    })
    .then((response) => {
      state.users = response.data.results.map((user) => {
        return { ...user, id: user.id.value };
      });
      state.loading = false;
    });
};

onMounted(() => {
  getUsers();
});

const { users, options, loading, detailsModal, selectedUser } = toRefs(state);
</script>
<style></style>
