<template>
  <div>
    <div class="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content dash-content p-4">
        <!-- Page content here -->
        <h1 v-for="i in 100">Dashboard view {{ i }}</h1>
        <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
      </div>
      <div class="drawer-side side-nav">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
          <!-- Sidebar content here -->
          <li v-for="i in 100">
            <a>Sidebar Item {{ i }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style>
.side-nav {
  max-height: calc(100vh - 64px);
  overflow: auto;
}

.dash-content {
  max-height: calc(100vh - 64px);
  overflow: auto;
}
</style>
