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
    <HamburgerBtn @open="handleOpen" @close="handleClose"></HamburgerBtn>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, defineEmits, defineProps, type Ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { supabase } from '@/services/supabase';
import HamburgerBtn from '@/components/ui/HamburgerBtn.vue';

const props = defineProps<{
  path: string;
  size: string;
}>();
const { path, size } = toRefs(props);

const handleOpen = () => {
  console.log('open heard');
};
const handleClose = () => {
  console.log('close heard');
};

const emit = defineEmits<{
  (e: 'upload'): void;
  (e: 'update:path', value: string): void;
}>();

const loading = ref(false);
const src = ref<string>('');
const files: Ref<File[]> = ref([]);

const initAvatarPreview = (e) => {
  files.value = e.target.files;
  console.log('file change event', e);

  if (!files.value || files.value.length === 0) {
    throw new Error('You must select an image to upload');
  }

  const file = files.value[0];
  src.value = URL.createObjectURL(file);
};

const uploadAvatar = async (e) => {
  alert('Please try again later');
  return;
  // try {
  //   loading.value = true;

  //   if (!files.value.length) {
  //     throw new Error('No files selected');
  //   }

  //   const file = files.value[0];
  //   const fileExt = file.name.split('.').pop();
  //   const filePath = `${Math.random()}.${fileExt}`;

  //   const { error: uploadError } = await supabase.storage
  //     .from('avatars')
  //     .upload(filePath, file);

  //   if (uploadError) throw uploadError;
  //   emit('update:path', filePath);
  //   emit('upload');

  //   console.log('upload success');
  // } catch (error) {
  //   console.log(error, 'error uploading avatar');
  // } finally {
  //   loading.value = false;
  // }
};

const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage
      .from('avatars')
      .download(path.value);

    if (error) throw error;
    src.value = URL.createObjectURL(data);
  } catch (error) {
    console.log(error, 'Error  downloading image: ');
  }
};

const clearSrc = () => {
  src.value = '';
};
</script>
