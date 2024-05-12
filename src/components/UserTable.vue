<template>
  <div>
    <DataTable
      selectable
      :loading="loading"
      :headers="headers"
      :items="users"
      :items-per-page-options="[5, 6, 7]"
      v-model:options="options"
    >
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
          <span class="mr-1" v-for="(member, index) in item.team" :key="index"
            >{{ member }}{{ index == item.team.length - 1 ? '' : ',' }}</span
          >
          <br />
          <span class="badge badge-primary badge-sm">{{ item.job }}</span>
        </div>
      </template>

      <template #item.details>
        <button @click="openDetails(item)" class="btn btn-ghost btn-xs">
          details
        </button>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, computed, watch, onMounted } from 'vue';
import DataTable from '@/components/ui/DataTable.vue';
import type { DataTableOptions } from '@/types/DataTableOptions';

const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Job', value: 'job' },
  { text: 'Favorite Color', value: 'favoriteColor' },
  { text: 'Details', value: 'details' }
];

const state = reactive({
  options: {
    page: 1,
    itemsPerPage: 5
  } as DataTableOptions,
  loading: true,
  users: [
    {
      firstName: 'Hart',
      lastName: 'Hagerty',
      country: 'United States',
      job: 'Desktop Support Technician',
      favoriteColor: 'Purple',
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      selected: false,
      team: ['Zemlak', 'Daniel', 'Leannon']
    },
    {
      firstName: 'Brice',
      lastName: 'Swyre',
      country: 'China',
      job: 'Tax Accountant',
      favoriteColor: 'Red',
      profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
      selected: false,
      team: ['Carroll Group']
    },
    {
      firstName: 'Marjy',
      lastName: 'Ferencz',
      country: 'Russia',
      job: 'Office Assistant',
      favoriteColor: 'Crimson',
      profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
      selected: false,
      team: ['Rowe-Schoen']
    },
    {
      firstName: 'Yancy',
      lastName: 'Tear',
      country: 'Brazil',
      job: 'Community Outreach Specialist',
      favoriteColor: 'Indigo',
      profileImage: 'https://randomuser.me/api/portraits/men/4.jpg',
      selected: false,
      team: ['Wyman-Ledner']
    },
    {
      firstName: 'Kaila',
      lastName: 'Keefer',
      country: 'Australia',
      job: 'Marketing Coordinator',
      favoriteColor: 'Blue',
      profileImage: 'https://randomuser.me/api/portraits/women/5.jpg',
      selected: false,
      team: ['Doyle', 'Schultz']
    },
    {
      firstName: 'Isaiah',
      lastName: 'Otten',
      country: 'Canada',
      job: 'Software Developer',
      favoriteColor: 'Green',
      profileImage: 'https://randomuser.me/api/portraits/men/6.jpg',
      selected: false,
      team: ['Feeney', 'Steuber']
    },
    {
      firstName: 'Zachery',
      lastName: 'Dale',
      country: 'Germany',
      job: 'Human Resources Specialist',
      favoriteColor: 'Yellow',
      profileImage: 'https://randomuser.me/api/portraits/men/7.jpg',
      selected: false,
      team: ['Klein', 'Lemke']
    },
    {
      firstName: 'Tyrell',
      lastName: 'Brumfield',
      country: 'France',
      job: 'Financial Analyst',
      favoriteColor: 'Orange',
      profileImage: 'https://randomuser.me/api/portraits/men/8.jpg',
      selected: false,
      team: ['Bartoletti', 'Bosco']
    },
    {
      firstName: 'Alyssa',
      lastName: 'Schmidt',
      country: 'Japan',
      job: 'Graphic Designer',
      favoriteColor: 'Pink',
      profileImage: 'https://randomuser.me/api/portraits/women/9.jpg',
      selected: false,
      team: ['Hoppe', 'Schiller']
    },
    {
      firstName: 'Camila',
      lastName: 'Green',
      country: 'South Korea',
      job: 'Product Manager',
      favoriteColor: 'Turquoise',
      profileImage: 'https://randomuser.me/api/portraits/women/10.jpg',
      selected: false,
      team: ['Blick', 'Block']
    },
    {
      firstName: 'Julian',
      lastName: 'Smith',
      country: 'Italy',
      job: 'Sales Representative',
      favoriteColor: 'Lavender',
      profileImage: 'https://randomuser.me/api/portraits/men/11.jpg',
      selected: false,
      team: ['Hermann', 'Lehner']
    },
    {
      firstName: 'Ashley',
      lastName: 'Brown',
      country: 'Mexico',
      job: 'Customer Service Representative',
      favoriteColor: 'Coral',
      profileImage: 'https://randomuser.me/api/portraits/women/12.jpg',
      selected: false,
      team: ['Waelchi', 'Hamill']
    },
    {
      firstName: 'Xander',
      lastName: 'Garcia',
      country: 'Spain',
      job: 'Project Manager',
      favoriteColor: 'Teal',
      profileImage: 'https://randomuser.me/api/portraits/men/13.jpg',
      selected: false,
      team: ['Lang', 'Towne']
    },
    {
      firstName: 'Mia',
      lastName: 'Wilson',
      country: 'Netherlands',
      job: 'UX Designer',
      favoriteColor: 'Fuchsia',
      profileImage: 'https://randomuser.me/api/portraits/women/14.jpg',
      selected: false,
      team: ['Lubowitz', 'Strosin']
    },
    {
      firstName: 'Liam',
      lastName: 'Martinez',
      country: 'Norway',
      job: 'Data Scientist',
      favoriteColor: 'Gold',
      profileImage: 'https://randomuser.me/api/portraits/men/15.jpg',
      selected: false,
      team: ['Bergnaum', 'Schowalter']
    },
    {
      firstName: 'Sophia',
      lastName: 'Johnson',
      country: 'Sweden',
      job: 'Business Analyst',
      favoriteColor: 'Silver',
      profileImage: 'https://randomuser.me/api/portraits/women/16.jpg',
      selected: false,
      team: ['Schneider', 'Weissnat']
    },
    {
      firstName: 'Noah',
      lastName: 'Davis',
      country: 'Switzerland',
      job: 'Network Engineer',
      favoriteColor: 'Bronze',
      profileImage: 'https://randomuser.me/api/portraits/men/17.jpg',
      selected: false,
      team: ['Brakus', 'Nienow']
    },
    {
      firstName: 'Emily',
      lastName: 'Miller',
      country: 'Austria',
      job: 'Technical Writer',
      favoriteColor: 'Ivory',
      profileImage: 'https://randomuser.me/api/portraits/women/18.jpg',
      selected: false,
      team: ['Koepp', 'Gleichner']
    },
    {
      firstName: 'Oliver',
      lastName: 'Taylor',
      country: 'Finland',
      job: 'IT Support Specialist',
      favoriteColor: 'Plum',
      profileImage: 'https://randomuser.me/api/portraits/men/19.jpg',
      selected: false,
      team: ['Dietrich', 'Herman']
    },
    {
      firstName: 'Ava',
      lastName: 'Moore',
      country: 'Denmark',
      job: 'Quality Assurance Engineer',
      favoriteColor: 'Peach',
      profileImage: 'https://randomuser.me/api/portraits/women/20.jpg',
      selected: false,
      team: ['Barton', 'Connelly']
    },
    {
      firstName: 'Ethan',
      lastName: 'Anderson',
      country: 'Belgium',
      job: 'Operations Manager',
      favoriteColor: 'Maroon',
      profileImage: 'https://randomuser.me/api/portraits/men/21.jpg',
      selected: false,
      team: ['Moore', 'Jenkins']
    },
    {
      firstName: 'Charlotte',
      lastName: 'Thomas',
      country: 'Ireland',
      job: 'Systems Analyst',
      favoriteColor: 'Olive',
      profileImage: 'https://randomuser.me/api/portraits/women/22.jpg',
      selected: false,
      team: ['Adams', 'Perry']
    },
    {
      firstName: 'James',
      lastName: 'White',
      country: 'Portugal',
      job: 'Database Administrator',
      favoriteColor: 'Navy',
      profileImage: 'https://randomuser.me/api/portraits/men/23.jpg',
      selected: false,
      team: ['Bennett', 'Ross']
    },
    {
      firstName: 'Amelia',
      lastName: 'Harris',
      country: 'Greece',
      job: 'Web Developer',
      favoriteColor: 'Magenta',
      profileImage: 'https://randomuser.me/api/portraits/women/24.jpg',
      selected: false,
      team: ['Cole', 'Sanders']
    },
    {
      firstName: 'Henry',
      lastName: 'Martin',
      country: 'Poland',
      job: 'Product Owner',
      favoriteColor: 'Cyan',
      profileImage: 'https://randomuser.me/api/portraits/men/25.jpg',
      selected: false,
      team: ['Price', 'Simmons']
    },
    {
      firstName: 'Isabella',
      lastName: 'Clark',
      country: 'Hungary',
      job: 'Content Strategist',
      favoriteColor: 'Salmon',
      profileImage: 'https://randomuser.me/api/portraits/women/26.jpg',
      selected: false,
      team: ['Powell', 'Foster']
    },
    {
      firstName: 'Sebastian',
      lastName: 'Lewis',
      country: 'Romania',
      job: 'Digital Marketing Specialist',
      favoriteColor: 'Mauve',
      profileImage: 'https://randomuser.me/api/portraits/men/27.jpg',
      selected: false,
      team: ['Ward', 'Ramirez']
    },
    {
      firstName: 'Mila',
      lastName: 'Walker',
      country: 'Czech Republic',
      job: 'SEO Specialist',
      favoriteColor: 'Mint',
      profileImage: 'https://randomuser.me/api/portraits/women/28.jpg',
      selected: false,
      team: ['Bailey', 'Griffin']
    },
    {
      firstName: 'Lucas',
      lastName: 'Young',
      country: 'Croatia',
      job: 'Cloud Architect',
      favoriteColor: 'Beige',
      profileImage: 'https://randomuser.me/api/portraits/men/29.jpg',
      selected: false,
      team: ['Cruz', 'Rogers']
    },
    {
      firstName: 'Aria',
      lastName: 'King',
      country: 'Slovakia',
      job: 'Data Analyst',
      favoriteColor: 'Lime',
      profileImage: 'https://randomuser.me/api/portraits/women/30.jpg',
      selected: false,
      team: ['Peterson', 'Cooper']
    },
    {
      firstName: 'Alexander',
      lastName: 'Scott',
      country: 'Bulgaria',
      job: 'Security Analyst',
      favoriteColor: 'Burgundy',
      profileImage: 'https://randomuser.me/api/portraits/men/31.jpg',
      selected: false,
      team: ['Reed', 'Hughes']
    },
    {
      firstName: 'Chloe',
      lastName: 'Green',
      country: 'Slovenia',
      job: 'Systems Engineer',
      favoriteColor: 'Violet',
      profileImage: 'https://randomuser.me/api/portraits/women/32.jpg',
      selected: false,
      team: ['Murphy', 'Bryant']
    },
    {
      firstName: 'Daniel',
      lastName: 'Hill',
      country: 'Serbia',
      job: 'Network Administrator',
      favoriteColor: 'Mustard',
      profileImage: 'https://randomuser.me/api/portraits/men/33.jpg',
      selected: false,
      team: ['Reyes', 'Phillips']
    },
    {
      firstName: 'Grace',
      lastName: 'Baker',
      country: 'Slovakia',
      job: 'UX Researcher',
      favoriteColor: 'Blush',
      profileImage: 'https://randomuser.me/api/portraits/women/34.jpg',
      selected: false,
      team: ['Stewart', 'Campbell']
    },
    {
      firstName: 'Matthew',
      lastName: 'Adams',
      country: 'Latvia',
      job: 'Software Engineer',
      favoriteColor: 'Peach',
      profileImage: 'https://randomuser.me/api/portraits/men/35.jpg',
      selected: false,
      team: ['Flores', 'Mitchell']
    },
    {
      firstName: 'Ella',
      lastName: 'Nelson',
      country: 'Lithuania',
      job: 'Customer Success Manager',
      favoriteColor: 'Cobalt',
      profileImage: 'https://randomuser.me/api/portraits/women/36.jpg',
      selected: false,
      team: ['Gonzales', 'Henderson']
    },
    {
      firstName: 'Ryan',
      lastName: 'Carter',
      country: 'Estonia',
      job: 'Technical Support Engineer',
      favoriteColor: 'Chartreuse',
      profileImage: 'https://randomuser.me/api/portraits/men/37.jpg',
      selected: false,
      team: ['Cruz', 'Parker']
    },
    {
      firstName: 'Victoria',
      lastName: 'Mitchell',
      country: 'Ukraine',
      job: 'Scrum Master',
      favoriteColor: 'Periwinkle',
      profileImage: 'https://randomuser.me/api/portraits/women/38.jpg',
      selected: false,
      team: ['Evans', 'Edwards']
    },
    {
      firstName: 'David',
      lastName: 'Perez',
      country: 'Belarus',
      job: 'Solutions Architect',
      favoriteColor: 'Charcoal',
      profileImage: 'https://randomuser.me/api/portraits/men/39.jpg',
      selected: false,
      team: ['Torres', 'Collins']
    },
    {
      firstName: 'Zoe',
      lastName: 'Roberts',
      country: 'Bosnia and Herzegovina',
      job: 'Business Intelligence Analyst',
      favoriteColor: 'Aqua',
      profileImage: 'https://randomuser.me/api/portraits/women/40.jpg',
      selected: false,
      team: ['Morris', 'Bell']
    },
    {
      firstName: 'Evelyn',
      lastName: 'Turner',
      country: 'Moldova',
      job: 'DevOps Engineer',
      favoriteColor: 'Sage',
      profileImage: 'https://randomuser.me/api/portraits/women/41.jpg',
      selected: false,
      team: ['Murphy', 'Harris']
    },
    {
      firstName: 'Landon',
      lastName: 'Wood',
      country: 'Montenegro',
      job: 'Back-end Developer',
      favoriteColor: 'Moss',
      profileImage: 'https://randomuser.me/api/portraits/men/42.jpg',
      selected: false,
      team: ['James', 'Powell']
    },
    {
      firstName: 'Hannah',
      lastName: 'Lewis',
      country: 'Kosovo',
      job: 'Front-end Developer',
      favoriteColor: 'Lilac',
      profileImage: 'https://randomuser.me/api/portraits/women/43.jpg',
      selected: false,
      team: ['Watson', 'Brooks']
    },
    {
      firstName: 'Nathan',
      lastName: 'Hughes',
      country: 'Albania',
      job: 'Full Stack Developer',
      favoriteColor: 'Cerulean',
      profileImage: 'https://randomuser.me/api/portraits/men/44.jpg',
      selected: false,
      team: ['Anderson', 'Stewart']
    },
    {
      firstName: 'Scarlett',
      lastName: 'Peterson',
      country: 'Macedonia',
      job: 'Product Designer',
      favoriteColor: 'Emerald',
      profileImage: 'https://randomuser.me/api/portraits/women/45.jpg',
      selected: false,
      team: ['Gomez', 'Sanchez']
    },
    {
      firstName: 'Aaron',
      lastName: 'Gray',
      country: 'Armenia',
      job: 'Tech Lead',
      favoriteColor: 'Amber',
      profileImage: 'https://randomuser.me/api/portraits/men/46.jpg',
      selected: false,
      team: ['Perry', 'Bennett']
    },
    {
      firstName: 'Lily',
      lastName: 'Ramirez',
      country: 'Georgia',
      job: 'Site Reliability Engineer',
      favoriteColor: 'Mint',
      profileImage: 'https://randomuser.me/api/portraits/women/47.jpg',
      selected: false,
      team: ['Barnes', 'Hayes']
    },
    {
      firstName: 'Owen',
      lastName: 'Bennett',
      country: 'Azerbaijan',
      job: 'Mobile Developer',
      favoriteColor: 'Copper',
      profileImage: 'https://randomuser.me/api/portraits/men/48.jpg',
      selected: false,
      team: ['Long', 'Fisher']
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

const openDetails = (user: User) => {
  state.selectedUser = user;
  console.log(state.selectedUser, 'selectedUser');
};
onMounted(() => {
  setTimeout(() => {
    state.loading = false;
  }, 1000);
});

const { users, options, loading } = toRefs(state);
</script>
<style></style>
