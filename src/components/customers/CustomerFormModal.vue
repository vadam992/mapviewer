<template>
  <dialog class="modal modal-open">
    <div class="modal-box w-11/12 max-w-xl">
      <h3 class="font-bold text-lg mb-4">
        {{ customer ? "Ügyfél szerkesztése" : "Új ügyfél" }}
      </h3>

      <form @submit.prevent="submitForm" class="flex flex-col gap-4">
        <!-- Név -->
        <div>
          <label class="label">
            <span class="label-text">Név</span>
          </label>
          <input
            v-model="form.name"
            type="text"
            class="input input-bordered w-full"
          />
          <p v-if="errors.name" class="text-red-500 text-sm">
            {{ errors.name }}
          </p>
        </div>

        <!-- Email -->
        <div>
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            v-model="form.email"
            type="email"
            class="input input-bordered w-full"
          />
          <p v-if="errors.email" class="text-red-500 text-sm">
            {{ errors.email }}
          </p>
        </div>

        <!-- Státusz -->
        <div>
          <label class="label">
            <span class="label-text">Státusz</span>
          </label>
          <select v-model="form.status" class="select select-bordered w-full">
            <option disabled value="">Válassz státuszt</option>
            <option value="active">Aktív</option>
            <option value="inactive">Inaktív</option>
            <option value="lead">Lead</option>
          </select>
          <p v-if="errors.status" class="text-red-500 text-sm">
            {{ errors.status }}
          </p>
        </div>

        <!-- Tagek -->
        <div>
          <label class="label">
            <span class="label-text">Tagek (vesszővel elválasztva)</span>
          </label>
          <input
            v-model="tagsInput"
            type="text"
            class="input input-bordered w-full"
            placeholder="pl. vip, fontos"
          />
        </div>

        <div class="modal-action">
          <button type="button" class="btn" @click="$emit('close')">
            Mégse
          </button>
          <button type="submit" class="btn btn-primary">Mentés</button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import type { Customer } from "../../types/customer";

const props = defineProps<{
  customer: Customer | null;
}>();

const emit = defineEmits(["close", "save"]);

const form = reactive({
  id: "",
  name: "",
  email: "",
  status: "",
  tags: [] as string[],
  createdAt: "",
});

const tagsInput = ref("");
const errors = reactive({
  name: "",
  email: "",
  status: "",
});

watch(
  () => props.customer,
  (c) => {
    if (c) {
      form.id = c.id;
      form.name = c.name;
      form.email = c.email;
      form.status = c.status;
      form.tags = [...c.tags];
      form.createdAt = c.createdAt;
      tagsInput.value = c.tags.join(", ");
    } else {
      form.id = "";
      form.name = "";
      form.email = "";
      form.status = "";
      form.tags = [];
      form.createdAt = new Date().toISOString();
      tagsInput.value = "";
    }
  },
  { immediate: true },
);

function validate() {
  errors.name = form.name.length < 3 ? "A név legalább 3 karakter legyen." : "";
  errors.email = !/^\S+@\S+\.\S+$/.test(form.email)
    ? "Érvényes email címet adj meg."
    : "";
  errors.status = !["active", "inactive", "lead"].includes(form.status)
    ? "Válassz érvényes státuszt."
    : "";

  return !errors.name && !errors.email && !errors.status;
}

function submitForm() {
  if (!validate()) return;

  form.tags = tagsInput.value
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  emit("save", { ...form });
}
</script>
