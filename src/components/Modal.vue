<template>
  <div>
    <!-- START: User Details Modal -->
    <dialog ref="modalDialog" id="user_details_modal" class="modal">
      <div class="modal-box">
        <slot> </slot>
        <!-- <h3 class="font-bold text-lg">Hello!</h3> -->
        <!-- <p class="py-4">Press ESC key or click outside to close</p> -->
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>Close</button>
      </form>
    </dialog>
    <!-- END: User Details Modal -->
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'

const modalDialog = ref<HTMLDialogElement | null>(null)

function closeModal() {
  modalDialog.value?.close()
}

function openModal() {
  modalDialog.value?.showModal()
}

defineExpose({
  openModal,
  closeModal
})
</script>
