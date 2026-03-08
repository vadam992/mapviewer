<template>
  <div class="drawer-side z-50">
    <label for="sidebar-toggle" class="drawer-overlay"></label>

    <aside class="menu p-4 w-80 min-h-full bg-base-200 relative">
      <label
        for="sidebar-toggle"
        class="btn btn-sm btn-circle absolute top-4 right-4"
      >
        ✕
      </label>

      <ul class="menu mt-10">
        <li>
          <label for="sidebar-toggle">
            <router-link to="/customers"> Ügyfelek </router-link>
          </label>
        </li>
        <li>
          <label for="sidebar-toggle">
            <router-link to="/map"> Térkép </router-link>
          </label>
        </li>
      </ul>
    </aside>
  </div>
</template>
