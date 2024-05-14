<template>
  <div>
    <p>Upload Component</p>
    <input
      type="file"
      class="file-input file-input-bordered file-input-primary"
      @change="onFileChange"
      accept="image/*"
    />

    <ModalComponent v-model="previewModal">
      <h3 class="text-bold text-2xl">Upload Preview</h3>
      <img v-if="previewUrl" :src="previewUrl" alt="Upload Preview" />

      <template #actions>
        <button @click="resetUploader" class="btn">Cancel</button>
        <button @click="initUpload" class="btn btn-primary">Upload</button>
      </template>
    </ModalComponent>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { defineEmits, defineProps } from 'vue';
import { supabase } from '@/services/supabase';
import ModalComponent from '../ui/ModalComponent.vue';

const props = defineProps<{
  bucketName: string;
}>();

const emit = defineEmits<{
  (e: 'success', url: string): void;
  (e: 'error', error: Error): void;
}>();

const file = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const previewModal = ref<boolean>(false);
const loading = ref<boolean>(false);

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.files && target.files[0]) {
    file.value = target.files[0];
    previewUrl.value = URL.createObjectURL(file.value);
    previewModal.value = true;
  } else {
    resetUploader();
  }
};

const resetUploader = () => {
  previewModal.value = false;
  previewUrl.value = null;
};

const initUpload = async () => {
  if (!file.value) return;

  try {
    loading.value = true;
    const fileName = `${Date.now()}-${file.value.name}`;
    const { data, error } = await supabase.storage
      .from(props.bucketName)
      .upload(fileName, file.value);

    if (error) throw error;

    const {
      data: { publicUrl }
    } = supabase.storage.from(props.bucketName).getPublicUrl(fileName);

    if (!publicUrl) {
      throw new Error('Failed to get public URL');
    }

    resetUploader();
    emit('success', publicUrl);
  } catch (error) {
    console.log(error);
    emit('error', error instanceof Error ? error : new Error('Unknown error'));
  } finally {
    loading.value = false;
  }
};
</script>
