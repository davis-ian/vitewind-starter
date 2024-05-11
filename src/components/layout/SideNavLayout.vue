<template>
  <div>
    <div class="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="nav-max-h drawer-content min-h-full">
        <!-- Page content here -->
        <label for="my-drawer" class="btn btn-primary drawer-button lg:hidden"
          >Open drawer</label
        >

        <slot name="page-content"></slot>
      </div>

      <div class="nav-max-h drawer-side min-h-full overflow-y-auto">
        <label for="my-drawer" class="drawer-overlay" />
        <ul class="menu min-h-full w-80 p-4">
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
