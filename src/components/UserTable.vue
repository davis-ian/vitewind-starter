<template>
  <div class="card card-compact bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    class="checkbox"
                    v-model="allUsersSelected"
                    @click="toggleAllUsers"
                  />
                </label>
              </th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            <!-- rows  -->
            <tr v-for="user in users">
              <th>
                <label>
                  <input type="checkbox" class="checkbox" v-model="user.selected" />
                </label>
              </th>
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img :src="user.profileImage" alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{{ user.firstName }} {{ user.lastName }}</div>
                    <div class="text-sm opacity-50">{{ user.country }}</div>
                  </div>
                </div>
              </td>
              <td>
                <span class="mr-1" v-for="(member, index) in user.team"
                  >{{ member }}{{ index == user.team.length - 1 ? '' : ',' }}</span
                >

                <br />
                <span class="badge badge-ghost badge-sm">{{ user.job }}</span>
              </td>
              <td>{{ user.favoriteColor }}</td>
              <th>
                <button class="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, computed, watch } from 'vue'

const state = reactive({
  users: [
    {
      firstName: 'Hart',
      lastName: 'Hagerty',
      country: 'United States',
      job: 'Desktop Support Technician',
      favoriteColor: 'Purple',
      profileImage: 'https://img.daisyui.com/tailwind-css-component-profile-2@56w.png',
      selected: false,
      team: ['Zemlak', 'Daniel', 'Leannon']
    },
    {
      firstName: 'Brice',
      lastName: 'Swyre',
      country: 'China',
      job: 'Tax Accountant',
      favoriteColor: 'Red',
      profileImage: 'https://img.daisyui.com/tailwind-css-component-profile-3@56w.png',
      selected: false,
      team: ['Carroll Group']
    },
    {
      firstName: 'Marjy',
      lastName: 'Ferencz',
      country: 'Russia',
      job: 'Office Assistant',
      favoriteColor: 'Crimson',
      profileImage: 'https://img.daisyui.com/tailwind-css-component-profile-4@56w.png',
      selected: false,
      team: ['Rowe-Schoen']
    },
    {
      firstName: 'Yancy',
      lastName: 'Tear',
      country: 'Brazil',
      job: 'Community Outreach Specialist',
      favoriteColor: 'Indigo',
      profileImage: 'https://img.daisyui.com/tailwind-css-component-profile-5@56w.png',
      selected: false,
      team: ['Wyman-Ledner']
    }
  ],
  allUsersSelected: false
})

const selectedUsers = computed(() => {
  return state.users.filter((user) => user.selected)
})

watch(selectedUsers, (newVal, oldVal) => {
  if (newVal.length == 0) {
    state.allUsersSelected = false
  }

  if (newVal.length == state.users.length) {
    state.allUsersSelected = true
  }
})

const toggleAllUsers = () => {
  state.allUsersSelected = !state.allUsersSelected

  state.users.forEach((user) => {
    state.allUsersSelected ? (user.selected = true) : (user.selected = false)
  })
}

const { users, allUsersSelected } = toRefs(state)
</script>
<style></style>
