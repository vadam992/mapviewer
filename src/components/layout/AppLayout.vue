<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "./Sidebar.vue";
import HeaderBar from "./HeaderBar.vue";

const sidebarOpen = ref(false);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}
</script>

<template>
  <div class="layout">
    <Sidebar :open="sidebarOpen" @toggleSidebar="toggleSidebar" />

    <div class="main">
      <HeaderBar @toggleSidebar="toggleSidebar" />
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content {
  padding: 1rem;
  overflow-y: auto;
}
</style>
