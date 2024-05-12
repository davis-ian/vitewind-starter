<template>
  <div>
    <!-- START: User Details Modal -->
    <dialog ref="modalDialog" class="modal" @close="emitClose">
      <div class="modal-box" style="max-width: 90%; width: fit-content">
        <div style="overflow: auto">
          <slot> </slot>
        </div>

        <div v-if="$slots.actions" class="mt-4">
          <slot name="actions"></slot>
        </div>
      </div>

      <form method="dialog" class="modal-backdrop" @click="closeModal">
        <button type="button">Close</button>
      </form>
    </dialog>
    <!-- END: User Details Modal -->
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose, watch, defineProps, defineEmits } from 'vue';

const modalDialog = ref<HTMLDialogElement | null>(null);

// Define props and emits for v-model
const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue']);

function closeModal() {
  if (modalDialog.value) {
    modalDialog.value.close();
    emit('update:modelValue', false);
  }
}

function openModal() {
  if (modalDialog.value) {
    modalDialog.value.showModal();
    emit('update:modelValue', true);
  }
}

function emitClose() {
  emit('update:modelValue', false);
}

// Watch for changes in modelValue to control the modal visibility
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      openModal();
    } else {
      closeModal();
    }
  }
);

// Expose the methods
defineExpose({
  openModal,
  closeModal
});
</script>

<style scoped>
/* Add your styles here */
</style>
