<template>
  <div>
    <DataTable selectable :headers="headers" :items="users">
      <template #item.name="{ item }">
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="mask mask-squircle h-12 w-12">
              <img
                :src="item.profileImage"
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div class="font-bold">
              {{ item.firstName }} {{ item.lastName }}
            </div>
            <div class="text-sm opacity-50">{{ item.country }}</div>
          </div>
        </div>
      </template>

      <template #item.job="{ item }">
        <div>
          <span class="mr-1" v-for="(member, index) in item.team"
            >{{ member }}{{ index == item.team.length - 1 ? '' : ',' }}</span
          >
          <br />
          <span class="badge badge-primary badge-sm">{{ item.job }}</span>
        </div>
      </template>

      <template #item.details>
        <button class="btn btn-ghost btn-xs">details</button>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, computed, watch } from 'vue';
import DataTable from '@/components/ui/DataTable.vue';

const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Job', value: 'job' },
  { text: 'Favorite Color', value: 'favoriteColor' },
  { text: 'Details', value: 'details' }
];

const state = reactive({
  users: [
    {
      firstName: 'Hart',
      lastName: 'Hagerty',
      country: 'United States',
      job: 'Desktop Support Technician',
      favoriteColor: 'Purple',
      profileImage:
        'https://img.daisyui.com/tailwind-css-component-profile-2@56w.png',
      selected: false,
      team: ['Zemlak', 'Daniel', 'Leannon']
    },
    {
      firstName: 'Brice',
      lastName: 'Swyre',
      country: 'China',
      job: 'Tax Accountant',
      favoriteColor: 'Red',
      profileImage:
        'https://img.daisyui.com/tailwind-css-component-profile-3@56w.png',
      selected: false,
      team: ['Carroll Group']
    },
    {
      firstName: 'Marjy',
      lastName: 'Ferencz',
      country: 'Russia',
      job: 'Office Assistant',
      favoriteColor: 'Crimson',
      profileImage:
        'https://img.daisyui.com/tailwind-css-component-profile-4@56w.png',
      selected: false,
      team: ['Rowe-Schoen']
    },
    {
      firstName: 'Yancy',
      lastName: 'Tear',
      country: 'Brazil',
      job: 'Community Outreach Specialist',
      favoriteColor: 'Indigo',
      profileImage:
        'https://img.daisyui.com/tailwind-css-component-profile-5@56w.png',
      selected: false,
      team: ['Wyman-Ledner']
    }
  ],
  allUsersSelected: false
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

const toggleAllUsers = () => {
  state.allUsersSelected = !state.allUsersSelected;

  state.users.forEach((user) => {
    state.allUsersSelected ? (user.selected = true) : (user.selected = false);
  });
};

const { users, allUsersSelected } = toRefs(state);
</script>
<style></style>
