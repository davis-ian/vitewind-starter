<template>
  <div>
    <side-nav-layout class="bg-base-300">
      <template #page-content>
        <dashboard-content />
      </template>

      <template #nav-content>
        <li v-for="i in 10" :key="i">
          <a>Sidebar Item {{ i }}</a>
        </li>
      </template>
    </side-nav-layout>
  </div>
</template>

<script setup lang="ts">
import DashboardContent from '@/components/DashboardContent.vue';
import SideNavLayout from '@/components/layout/SideNavLayout.vue';
</script>

<style></style>
