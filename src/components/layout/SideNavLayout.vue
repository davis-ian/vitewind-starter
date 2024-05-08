<template>
  <div>
    <div class="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content nav-max-h min-h-full bg-base-200">
        <!-- Page content here -->
        <label for="my-drawer" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>

        <slot name="page-content"></slot>
      </div>

      <div class="drawer-side nav-max-h bg-base-200">
        <label for="my-drawer" class="drawer-overlay" />
        <ul class="menu p-4 overflow-y-auto w-80 min-h-full">
          <!-- Sidebar Content here -->
          <slot name="nav-content"></slot>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.nav-max-h {
  max-height: calc(100vh - 64px);
  overflow-y: auto;
}
</style>
