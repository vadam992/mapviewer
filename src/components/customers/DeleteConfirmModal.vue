<template>
  <dialog class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Biztosan törlöd?</h3>
      <p class="py-4">Ez a művelet nem visszavonható.</p>

      <div class="modal-action">
        <button class="btn" @click="$emit('cancel')">Mégse</button>
        <button class="btn btn-error" @click="$emit('confirm')">Törlés</button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
defineEmits(["confirm", "cancel"]);
</script>
