<template>
  <div class="drawer lg:drawer-open">
    <input id="sidebar-toggle" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex flex-col">
      <HeaderBar />
      <main class="p-4">
        <slot />
      </main>
    </div>

    <Sidebar />
  </div>
</template>

<script setup lang="ts">
import "vue";
import Sidebar from "./Sidebar.vue";
import HeaderBar from "./HeaderBar.vue";
</script>
