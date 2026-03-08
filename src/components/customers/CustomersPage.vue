<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Ügyfelek</h2>

      <button class="btn btn-primary" @click="openCreateModal">
        Új ügyfél
      </button>
    </div>

    <CustomersTable
      :customers="customers"
      @edit="openEditModal"
      @delete="askDelete"
      @set-location="openLocationModal"
    />

    <CustomerFormModal
      v-if="showForm"
      :customer="selectedCustomer"
      @close="closeFormModal"
      @save="handleSave"
    />

    <DeleteConfirmModal
      v-if="showDelete"
      @cancel="showDelete = false"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCustomers } from "../../composables/useCustomers";
import CustomersTable from "./CustomersTable.vue";
import CustomerFormModal from "./CustomerFormModal.vue";
import DeleteConfirmModal from "./DeleteConfirmModal.vue";
const showDelete = ref(false);
const deleteId = ref<string | null>(null);
const { customers, addCustomer, updateCustomer, deleteCustomer } =
  useCustomers();

const showForm = ref(false);
const selectedCustomer = ref(null as any);

function openCreateModal() {
  selectedCustomer.value = null;
  showForm.value = true;
}

function openEditModal(customer: any) {
  selectedCustomer.value = customer;
  showForm.value = true;
}

function closeFormModal() {
  showForm.value = false;
}

function handleSave(customer: any) {
  if (customer.id) {
    updateCustomer(customer);
  } else {
    addCustomer({
      ...customer,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    });
  }

  showForm.value = false;
}

function askDelete(id: string) {
  deleteId.value = id;
  showDelete.value = true;
}

function confirmDelete() {
  if (deleteId.value) {
    deleteCustomer(deleteId.value);
  }
  showDelete.value = false;
}

function openLocationModal(customer: any) {
  console.log("Lokáció modal megnyitása:", customer);
}
</script>
