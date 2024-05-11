<template>
  <div class="card card-compact bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="overflow-x-auto">
        <table class="table" :class="tableClassModifiers">
          <!-- head -->
          <thead>
            <tr>
              <slot name="header">
                <th v-if="selectable">
                  <label>
                    <slot :name="`item.select`">
                      <input
                        type="checkbox"
                        class="checkbox"
                        @change="toggleAllItems"
                      />
                    </slot>
                  </label>
                </th>
                <th v-for="header in headers" :key="header.text">
                  <label>
                    <slot :name="`header.${header.value}`" :item="header">
                      {{ header.text }}
                    </slot>
                  </label>
                </th>
              </slot>
            </tr>
          </thead>
          <tbody>
            <!-- rows  -->

            <tr
              v-for="(item, index) in paginatedItems"
              :key="index"
              :class="rowClassModifiers"
            >
              <th v-if="selectable">
                <label>
                  <input
                    type="checkbox"
                    class="checkbox"
                    v-model="item.selected"
                  />
                </label>
              </th>

              <th v-for="header in headers">
                <slot :name="`item.${header.value}`" :item="item">
                  {{ item[header.value] }}
                </slot>
              </th>
            </tr>
          </tbody>
        </table>
        <!-- pagination -->
        <div v-if="!hideFooter" class="mt-4 flex items-center justify-between">
          <button
            class="btn btn-ghost btn-sm"
            @click="prevPage"
            :disabled="currentPage === 1"
          >
            Previous
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <span>Total Items {{ totalItems }}</span>
          <button
            class="btn btn-ghost btn-sm"
            @click="nextPage"
            :disabled="currentPage === totalPages"
          >
            Next
          </button>
        </div>
        <div class="border-4 border-red-500">{{ localOptions }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, computed, watch, ref } from 'vue';
import type { DataTableOptions } from '@/types/DataTableOptions';

interface Header {
  text: string;
  value: string;
  selectable?: boolean;
}

interface Item {
  [key: string]: any;
  selected?: boolean;
}

const props = defineProps<{
  headers: Header[];
  items: Item[];
  // itemsPerPage?: number;
  options: DataTableOptions;
  totalItems?: number;
  selectable?: boolean;
  zebra?: boolean;
  pinRows?: boolean;
  pinCols?: boolean;
  highlightOnHover?: boolean;
  size?: string;
  hideFooter?: boolean;
  loading?: boolean;
  serverItemsLength?: number;
}>();

const emit = defineEmits<{
  (e: 'update:options', value: DataTableOptions): void;
}>();

const localOptions = ref<DataTableOptions>({ ...props.options });

watch(
  localOptions,
  (newOptions) => {
    emit('update:options', newOptions);
  },
  { deep: true }
);

const state = reactive({
  allItemsSelected: false,
  currentPage: 1
});

const defaultItemsPerPage = 10;

const paginatedItems = computed(() => {
  const start =
    (state.currentPage - 1) *
    (props.options.itemsPerPage || defaultItemsPerPage);
  return props.items.slice(
    start,
    start + (props.options.itemsPerPage || defaultItemsPerPage)
  );
});

const totalPages = computed(() => {
  return Math.ceil(
    props.items.length / (props.options.itemsPerPage || defaultItemsPerPage)
  );
});

const totalItems = computed(() => {
  return props.serverItemsLength || props.items.length;
});

const selectedItems = computed(() => {
  return props.items.filter((item) => item.selected);
});

const tableClassModifiers = computed(() => {
  var classMods: string[] = [];

  if (props.pinCols) classMods.push('table-pin-cols');
  if (props.pinRows) classMods.push('table-pin-rows');
  if (props.zebra) classMods.push('table-zebra');
  if (props.size) classMods.push(`table-${props.size}`);
  return classMods;
});

const rowClassModifiers = computed(() => {
  const rowMods: string[] = [];

  if (props.highlightOnHover) rowMods.push('hover');

  return rowMods;
});

watch(selectedItems, (newVal, oldVal) => {
  if (newVal.length === 0) {
    state.allItemsSelected = false;
  } else if (newVal.length === props.items.length) {
    state.allItemsSelected = true;
  }
});

const toggleAllItems = () => {
  state.allItemsSelected = !state.allItemsSelected;
  props.items.forEach((item) => {
    item.selected = state.allItemsSelected;
  });
};

const prevPage = () => {
  if (localOptions.value.page > 1) {
    localOptions.value.page--;
  }
};

const nextPage = () => {
  if (localOptions.value.page < totalPages.value) {
    localOptions.value.page++;
  }
};

const { allItemsSelected, currentPage } = toRefs(state);
</script>

<style scoped>
.table {
  width: 100%;
}
</style>
