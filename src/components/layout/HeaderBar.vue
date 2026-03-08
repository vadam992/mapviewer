<template>
  <header class="header">
    <button class="hamburger" @click="$emit('toggleSidebar')">☰</button>

    <h1 class="title">Admin Dashboard</h1>

    <div class="user">
      <span>User: Admin</span>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.header {
  height: 60px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
}

.hamburger {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.user {
  font-weight: bold;
}

@media (min-width: 768px) {
  .hamburger{
    display: none;
  }
}
</style>
