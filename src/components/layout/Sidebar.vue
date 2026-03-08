<template>
  <aside :class="['sidebar', { open }]">
    <button class="close-btn" @click="$emit('toggleSidebar')">✕</button>
    <nav>
      <router-link to="/customers" @click="$emit('toggleSidebar')"
        >Ügyfelek</router-link
      >
      <router-link to="/map" @click="$emit('toggleSidebar')"
        >Térkép</router-link
      >
    </nav>
  </aside>
</template>

<script setup lang="ts">
defineProps<{ open: boolean }>();
defineEmits(["toggleSidebar"]);
</script>

<style scoped>
.sidebar {
  width: 240px;
  background: #1e1e1e;
  color: white;
  padding: 1rem;
  transition: transform 0.3s ease;
  position: relative;
}

/* X gomb */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: white;
  font-size: 22px;
  cursor: pointer;
}

.sidebar a {
  display: block;
  color: white;
  margin: 1rem 0;
}

@media (min-width: 768px) {
  .close-btn {
    display: none;
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: absolute;
    height: 100%;
    transform: translateX(-100%);
    z-index: 1000;
  }
  .sidebar.open {
    transform: translateX(0);
  }
}
</style>
