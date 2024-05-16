<template>
  <div>
    <p>Avatar</p>
    <div v-if="src">
      <img :src="src" alt="Avatar" class="image avatar" />
      <div class="flex gap-4 py-4">
        <button @click="clearSrc" class="btn">Clear</button>
        <button
          class="btn btn-primary"
          @click="uploadAvatar"
          v-if="files"
          :disabled="loading"
        >
          Save
        </button>
      </div>
    </div>
    <div v-else class="no-image avatar">No Image Found</div>

    <div v-if="!src">
      <input
        type="file"
        class="file-input file-input-bordered input-primary"
        accept="image/*"
        @change="initAvatarPreview"
        :disabled="loading"
        id="single"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, type Ref } from 'vue';
import { supabase } from '@/services/supabase';

const emit = defineEmits<{
  (e: 'upload'): void;
  (e: 'update:path', value: string): void;
}>();

const loading = ref(false);
const src = ref<string>('');
const files: Ref<FileList | null> = ref(null);

const initAvatarPreview = (e: Event | null) => {
  const input = e?.target as HTMLInputElement;

  files.value = input?.files;

  if (!files.value || files.value.length === 0) {
    throw new Error('You must select an image to upload');
  }

  const file = files.value[0];
  src.value = URL.createObjectURL(file);
};

const uploadAvatar = async () => {
  try {
    loading.value = true;

    if (!files?.value?.length) {
      throw new Error('No files selected');
    }

    const file = files.value[0];
    const fileExt = file.name.split('.').pop();
    const filePath = `${Math.random()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) throw uploadError;
    emit('update:path', filePath);
    emit('upload');
  } catch (error) {
    console.log(error, 'error uploading avatar');
  } finally {
    loading.value = false;
  }
};

const clearSrc = () => {
  src.value = '';
};
</script>
