<template>
  <dialog class="modal modal-open">
    <div class="modal-box w-11/12 max-w-3xl">
      <h3 class="font-bold text-lg mb-4">
        Lokáció beállítása – {{ customer.name }}
      </h3>

      <div class="flex flex-col gap-4">
        <!-- Térkép -->
        <div id="map" class="w-full h-64 rounded border"></div>

        <!-- Address -->
        <div>
          <label class="label">
            <span class="label-text">Cím</span>
          </label>
          <input
            v-model="form.address"
            type="text"
            class="input input-bordered w-full"
            placeholder="pl. Szeged, Kossuth Lajos sgt. 10."
          />
        </div>

        <!-- Latitude -->
        <div>
          <label class="label">
            <span class="label-text">Latitude</span>
          </label>
          <input
            v-model.number="form.lat"
            type="number"
            step="0.000001"
            class="input input-bordered w-full"
          />
          <p v-if="errors.lat" class="text-red-500 text-sm">{{ errors.lat }}</p>
        </div>

        <!-- Longitude -->
        <div>
          <label class="label">
            <span class="label-text">Longitude</span>
          </label>
          <input
            v-model.number="form.lng"
            type="number"
            step="0.000001"
            class="input input-bordered w-full"
          />
          <p v-if="errors.lng" class="text-red-500 text-sm">{{ errors.lng }}</p>
        </div>

        <div class="modal-action">
          <button class="btn" @click="$emit('close')">Mégse</button>
          <button class="btn btn-primary" @click="submitForm">Mentés</button>
        </div>
      </div>
    </div>
  </dialog>
</template>

<style>
#map {
  height: 200px;
}
</style>

<script setup lang="ts">
import { reactive, watch, onMounted } from "vue";
import L from "leaflet";
import type { Customer } from "../../types/customer";

const props = defineProps<{ customer: Customer }>();
const emit = defineEmits(["close", "save"]);

const form = reactive({
  lat: 47.4979,
  lng: 19.0402,
  address: "",
});

const errors = reactive({
  lat: "",
  lng: "",
});

let map: L.Map;
let marker: L.Marker;

watch(
  () => props.customer,
  (c) => {
    if (c.location) {
      form.lat = c.location.lat;
      form.lng = c.location.lng;
      form.address = c.location.address || "";
    }
  },
  { immediate: true },
);

onMounted(() => {
  map = L.map("map").setView([form.lat, form.lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(map);

  marker = L.marker([form.lat, form.lng], { draggable: true }).addTo(map);

  marker.on("dragend", () => {
    const pos = marker.getLatLng();
    form.lat = pos.lat;
    form.lng = pos.lng;
  });
});

watch(
  () => [form.lat, form.lng],
  ([lat, lng]) => {
    if (marker) {
      marker.setLatLng([lat, lng]);
      map.setView([lat, lng]);
    }
  },
);

function validate() {
  const latFilled =
    form.lat !== 0 && form.lat !== null && form.lat !== undefined;
  const lngFilled =
    form.lng !== 0 && form.lng !== null && form.lng !== undefined;

  if ((latFilled && !lngFilled) || (!latFilled && lngFilled)) {
    errors.lat = "Mindkét koordinátát meg kell adni.";
    errors.lng = "Mindkét koordinátát meg kell adni.";
    return false;
  }

  if (form.address && (!latFilled || !lngFilled)) {
    errors.lat = "A cím csak koordinátákkal együtt adható meg.";
    errors.lng = "A cím csak koordinátákkal együtt adható meg.";
    return false;
  }

  errors.lat =
    form.lat < -90 || form.lat > 90 ? "A latitude -90 és 90 között lehet." : "";
  errors.lng =
    form.lng < -180 || form.lng > 180
      ? "A longitude -180 és 180 között lehet."
      : "";

  return !errors.lat && !errors.lng;
}

function submitForm() {
  if (!validate()) return;

  if (!form.lat && !form.lng && !form.address) {
    emit("save", {
      ...props.customer,
      location: null,
    });
    return;
  }

  emit("save", {
    ...props.customer,
    location: {
      lat: form.lat,
      lng: form.lng,
      address: form.address,
    },
  });
}
</script>
