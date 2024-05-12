<template>
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
                    :checked="allItemsSelected"
                    @change="toggleAllItems"
                  />
                </slot>
              </label>
            </th>
            <th v-for="header in headers" :key="header.value">
              <label>
                <div class="flex items-center gap-2">
                  <div>
                    <slot :name="`header.${header.value}`" :item="header">
                      {{ header.text }}
                    </slot>
                  </div>
                  <div class="cursor-pointer" v-if="header.sortable">
                    <div
                      class="btn btn-ghost btn-xs"
                      @click="toggleSort(header)"
                    >
                      <div
                        v-if="
                          header.value == localOptions.sortBy &&
                          localOptions.sortDesc != null
                        "
                        class="text-primary"
                      >
                        <font-awesome-icon
                          v-if="localOptions.sortDesc == true"
                          icon="fa-solid fa-arrow-down"
                        ></font-awesome-icon>
                        <font-awesome-icon
                          v-else
                          icon="fa-solid fa-arrow-up"
                        ></font-awesome-icon>
                      </div>
                      <div v-else>
                        <font-awesome-icon
                          icon="fa-solid fa-arrow-down-up-across-line"
                        ></font-awesome-icon>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            </th>
          </slot>
        </tr>
      </thead>

      <tr v-if="props.loading">
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
                @change="toggleItemSelection(item)"
                :checked="isSelected(item)"
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
        <font-awesome-icon icon="fa-solid fa-angles-left"></font-awesome-icon>
      </button>
      <button
        class="btn btn-ghost btn-sm"
        @click="prevPage"
        :disabled="options.page === 1"
      >
        <font-awesome-icon icon="fa-solid fa-angle-left"></font-awesome-icon>
      </button>
      <button
        class="btn btn-ghost btn-sm"
        @click="nextPage"
        :disabled="options.page === totalPages"
      >
        <font-awesome-icon icon="fa-solid fa-angle-right"></font-awesome-icon>
      </button>
      <button
        class="btn btn-ghost btn-sm"
        @click="lastPage"
        :disabled="options.page === totalPages"
      >
        <font-awesome-icon icon="fa-solid fa-angles-right"></font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch, ref, toRefs } from 'vue';
import type { DataTableOptions } from '@/types/DataTableOptions';

interface Header {
  sortable: any;
  text: string;
  value: string;
  selectable?: boolean | false;
}

interface Item {
  [key: string]: any;
  selected?: boolean | null;
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
  serverItemsLength?: number | 0;
}>();

const emit = defineEmits<{
  (e: 'update:options', value: DataTableOptions): void;
}>();

const defaultItemsPerPage = 10;
const defaultSortBy = 'id';

const localOptions = ref<DataTableOptions>({
  ...props.options,
  itemsPerPage: props.options.itemsPerPage ?? defaultItemsPerPage,
  sortDesc: props.options.sortDesc ?? null,
  sortBy: props.options.sortBy ?? defaultSortBy
});

watch(
  localOptions,
  (newOptions) => {
    emit('update:options', newOptions);
  },
  { deep: true }
);

const state = reactive({
  allItemsSelected: false,
  selectedItems: [] as string[]
});

const paginatedItems = computed(() => {
  if (props.serverItemsLength && props.serverItemsLength > props.items.length) {
    return props.items;
  } else {
    const start = (props.options.page - 1) * localOptions.value.itemsPerPage;
    return props.items.slice(start, start + props.options.itemsPerPage);
  }
});

const totalPages = computed(() => {
  return Math.ceil(
    (props.serverItemsLength || props.items.length) / props.options.itemsPerPage
  );
});

const pageIndexStart = computed(() => {
  return (props.options.page - 1) * props.options.itemsPerPage + 1;
});

const pageIndexEnd = computed(() => {
  return props.options.page * props.options.itemsPerPage;
});

const totalItems = computed(() => {
  return props.serverItemsLength || props.items.length;
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

const prevPage = () => {
  if (localOptions.value.page > 1) {
    localOptions.value.page--;
    state.allItemsSelected = false;
  }
};

const nextPage = () => {
  if (localOptions.value.page < totalPages.value) {
    localOptions.value.page++;

    state.allItemsSelected = false;
  }
};

const firstPage = () => {
  if (localOptions.value.page > 1) {
    localOptions.value.page = 1;
    state.allItemsSelected = false;
  }
};

const lastPage = () => {
  if (localOptions.value.page < totalPages.value) {
    localOptions.value.page = totalPages.value;
    state.allItemsSelected = false;
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

const toggleSort = (header: Header) => {
  localOptions.value.page = 1;
  //Toggle sortByDesc Value
  if (header.value == localOptions.value.sortBy) {
    switch (localOptions.value.sortDesc) {
      case true:
        localOptions.value.sortDesc = false;
        break;
      case false:
        localOptions.value.sortDesc = null;
        break;
      case null:
        localOptions.value.sortDesc = true;
        break;
    }
  } else {
    localOptions.value.sortBy = header.value;
    localOptions.value.sortDesc = true;
  }
};

const isSelected = (item: Item) => {
  return state.selectedItems.includes(item.id);
};

const toggleItemSelection = (item: Item) => {
  const itemId = item.id;
  console.log(itemId, 'itemId');

  if (isSelected(item)) {
    state.selectedItems = state.selectedItems.filter((id) => id !== itemId);
  } else {
    state.selectedItems.push(itemId);
  }
};

const toggleAllItems = () => {
  if (state.allItemsSelected) {
    state.selectedItems = state.selectedItems.filter(
      (id) => !paginatedItems.value.some((item) => item.id === id)
    );
  } else {
    paginatedItems.value.forEach((item) => {
      if (!isSelected(item)) {
        state.selectedItems.push(item.id);
      }
    });
  }
  state.allItemsSelected = !state.allItemsSelected;
};

const { selectedItems, allItemsSelected } = toRefs(state);
</script>

<style scoped>
.table {
  width: 100%;
}
</style>
