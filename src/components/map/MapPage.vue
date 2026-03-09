<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Ügyfelek térképe</h1>

    <div id="map" class="w-full h-[600px] rounded border"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import L from "leaflet";
import { useCustomers } from "../../composables/useCustomers";

const { customers } = useCustomers();

let map: L.Map;

onMounted(() => {
  map = L.map("map").setView([47.4979, 19.0402], 7);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(map);

  const customersWithLocation = customers.value.filter((c) => c.location);

  customersWithLocation.forEach((c) => {
    if (!c.location) return;
    const marker = L.marker([c.location.lat, c.location.lng]).addTo(map);

    marker.bindPopup(`
      <b>${c.name}</b><br>
      ${c.email}
    `);
  });
});
</script>

<style>
#map {
  height: 600px;
  z-index: -2;
}
</style>
