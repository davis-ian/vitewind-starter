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
                <th v-for="header in headers" :key="header.value">
                  <label>
                    <slot :name="`header.${header.value}`" :item="header">
                      {{ header.text }}
                    </slot>
                  </label>
                </th>
              </slot>
            </tr>
          </thead>

          <tbody v-if="props.loading">
            <tr>
              <td
                :colspan="selectable ? headers.length + 1 : headers.length"
                class="p-0"
              >
                <slot name="loading">
                  <progress class="progress progress-primary w-full"></progress>
                  <div class="flex justify-center">
                    <span>Loading...</span>
                  </div>
                </slot>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
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

              <th v-for="header in headers" :key="header.value">
                <slot :name="`item.${header.value}`" :item="item">
                  {{ item[header.value] }}
                </slot>
              </th>
            </tr>
          </tbody>
        </table>
        <!-- pagination -->

        <div
          v-if="!hideFooter"
          class="flex justify-end gap-2 border-t border-base-200 pt-4"
        >
          <div class="flex items-center">
            <span
              >{{ pageIndexStart }} - {{ pageIndexEnd }} of {{ totalItems }}
            </span>
          </div>
          <select
            v-model="localOptions.itemsPerPage"
            class="select select-bordered select-sm w-full max-w-20"
          >
            <option
              v-for="(selection, index) in computedItemsPerPageOptions"
              :key="index"
              :value="selection"
            >
              {{ selection }}
            </option>
          </select>
          <button
            class="btn btn-ghost btn-sm"
            @click="firstPage"
            :disabled="options.page === 1"
          >
            <font-awesome-icon
              icon="fa-solid fa-angles-left"
            ></font-awesome-icon>
          </button>
          <button
            class="btn btn-ghost btn-sm"
            @click="prevPage"
            :disabled="options.page === 1"
          >
            <font-awesome-icon
              icon="fa-solid fa-angle-left"
            ></font-awesome-icon>
          </button>
          <button
            class="btn btn-ghost btn-sm"
            @click="nextPage"
            :disabled="options.page === totalPages"
          >
            <font-awesome-icon
              icon="fa-solid fa-angle-right"
            ></font-awesome-icon>
          </button>
          <button
            class="btn btn-ghost btn-sm"
            @click="lastPage"
            :disabled="options.page === totalPages"
          >
            <font-awesome-icon
              icon="fa-solid fa-angles-right"
            ></font-awesome-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch, ref } from 'vue';
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
  options: DataTableOptions;
  itemsPerPageOptions?: number[];
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

const localOptions = ref<DataTableOptions>(props.options);

watch(
  localOptions,
  (newOptions) => {
    // console.log(newOptions, 'new local option');
    emit('update:options', newOptions);
  },
  { deep: true }
);

const state = reactive({
  allItemsSelected: false
});

const defaultItemsPerPage = 10;

const paginatedItems = computed(() => {
  const start =
    (props.options.page - 1) *
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

const pageIndexStart = computed(() => {
  return (
    (props.options.page - 1) *
      (props.options.itemsPerPage || defaultItemsPerPage) +
    1
  );
});

const pageIndexEnd = computed(() => {
  return (
    props.options.page * (props.options.itemsPerPage || defaultItemsPerPage)
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

const firstPage = () => {
  if (localOptions.value.page > 1) {
    localOptions.value.page = 1;
  }
};

const lastPage = () => {
  if (localOptions.value.page < totalPages.value) {
    localOptions.value.page = totalPages.value;
  }
};

// Default items per page options
const defaultItemsPerPageOptions = [5, 10, 15];

// Computed property to use the prop value or the default value
const computedItemsPerPageOptions = computed(() => {
  return props.itemsPerPageOptions && props.itemsPerPageOptions.length
    ? props.itemsPerPageOptions
    : defaultItemsPerPageOptions;
});
</script>

<style scoped>
.table {
  width: 100%;
}
</style>
