<template>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          <th @click="toggleSort('name')" class="cursor-pointer select-none">
            <div class="flex items-center gap-1">
              Név
              <span
                :class="[
                  'text-xs',
                  sortBy === 'name' ? 'text-black' : 'text-gray-400',
                ]"
              >
                <span v-if="sortBy === 'name'">
                  {{ sortDir === "asc" ? "▲" : "▼" }}
                </span>
                <span v-else> ▲ </span>
              </span>
            </div>
          </th>
          <th>Email</th>
          <th>Státusz</th>
          <th>Tagek</th>
          <th
            @click="toggleSort('createdAt')"
            class="cursor-pointer select-none"
          >
            <div class="flex items-center gap-1">
              Létrehozva

              <span
                :class="[
                  'text-xs',
                  sortBy === 'createdAt' ? 'text-black' : 'text-gray-400',
                ]"
              >
                <span v-if="sortBy === 'createdAt'">
                  {{ sortDir === "asc" ? "▲" : "▼" }}
                </span>
                <span v-else> ▲ </span>
              </span>
            </div>
          </th>

          <th>Műveletek</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="c in paginated" :key="c.id">
          <td>{{ c.name }}</td>
          <td>{{ c.email }}</td>

          <td>
            <span class="badge badge-info">{{ c.status }}</span>
          </td>

          <td>
            <div class="flex gap-1">
              <span
                v-for="tag in c.tags"
                :key="tag"
                class="badge badge-outline"
              >
                {{ tag }}
              </span>
            </div>
          </td>

          <td>{{ formatDate(c.createdAt) }}</td>

          <td class="flex gap-2">
            <button class="btn btn-sm" @click="$emit('edit', c)">Szerk.</button>
            <button class="btn btn-sm btn-error" @click="$emit('delete', c.id)">
              Törlés
            </button>

            <button
              class="btn btn-sm btn-accent"
              @click="$emit('set-location', c)"
            >
              Lokáció
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between items-center mt-4">
      <!-- Rows per page -->
      <div class="flex items-center gap-2">
        <span class="text-sm">Sorok száma:</span>
        <select
          v-model="rowsPerPage"
          class="select select-bordered select-sm w-24"
        >
          <option v-for="n in rowsOptions" :key="n" :value="n">
            {{ n }}
          </option>
        </select>
      </div>

      <!-- Pagination -->
      <div class="join">
        <button
          class="btn btn-sm join-item"
          :disabled="page === 1"
          @click="page--"
        >
          «
        </button>

        <button class="btn btn-sm join-item">
          {{ page }} / {{ totalPages }}
        </button>

        <button
          class="btn btn-sm join-item"
          :disabled="page === totalPages"
          @click="page++"
        >
          »
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{ customers: any[] }>();
defineEmits(["edit", "delete", "set-location"]);

const sortBy = ref<"name" | "createdAt">("name");
const sortDir = ref<"asc" | "desc">("asc");
const page = ref(1);
const rowsPerPage = ref(10);

const rowsOptions = [10, 25, 50];

const paginated = computed(() => {
  const start = (page.value - 1) * rowsPerPage.value;
  return sorted.value.slice(start, start + rowsPerPage.value);
});

const totalPages = computed(() =>
  Math.ceil(sorted.value.length / rowsPerPage.value),
);

const sorted = computed(() => {
  return [...props.customers].sort((a, b) => {
    let valA = a[sortBy.value];
    let valB = b[sortBy.value];

    if (sortBy.value === "createdAt") {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    }

    if (valA < valB) return sortDir.value === "asc" ? -1 : 1;
    if (valA > valB) return sortDir.value === "asc" ? 1 : -1;
    return 0;
  });
});

function toggleSort(field: "name" | "createdAt") {
  if (sortBy.value === field) {
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = field;
    sortDir.value = "asc";
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("hu-HU");
}
</script>
