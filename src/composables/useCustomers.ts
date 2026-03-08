import { ref, computed } from "vue";
import type { Customer } from "../types/customer";

const STORAGE_KEY = "senior-fe-test.customers.v1";

const customers = ref<Customer[]>([]);

function loadCustomers() {
  const raw = localStorage.getItem(STORAGE_KEY);
  customers.value = raw ? JSON.parse(raw) : [];
}

function saveCustomers() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers.value));
}

function addCustomer(c: Customer) {
  customers.value.push(c);
  saveCustomers();
}

function updateCustomer(updated: Customer) {
  customers.value = customers.value.map((c) =>
    c.id === updated.id ? updated : c,
  );
  saveCustomers();
}

function deleteCustomer(id: string) {
  customers.value = customers.value.filter((c) => c.id !== id);
  saveCustomers();
}

export function useCustomers() {
  if (!customers.value.length) {
    loadCustomers();
  }

  return {
    customers: computed(() => customers.value),
    addCustomer,
    updateCustomer,
    deleteCustomer,
  };
}
