<template>
  <div>
    <side-nav-layout class="bg-base-300">
      <template v-slot:page-content>
        <dashboard-content />
      </template>

      <template v-slot:nav-content>
        <li v-for="i in 10">
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
