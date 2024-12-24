<template>
    <q-table 
        v-model:pagination="pagination"
        :rows="data"
        :columns="columns"
        :rows-per-page-options="rowsPerPageOptions"
        @request="refresh"     
        class="full-width"
        >
        <template 
            v-slot:top-right
        >
            <q-badge
                v-if="!hideTotalRows"
                class="text-subtitle2 full-width d-flex justify-center align-center non-selectable"
                style="height: 38px"
                color="grey-5"
                outline
            >
                <span class="text-grey-8">
                    Total de Registros: {{ metadata.total }}
                </span
            >
          </q-badge>
        </template>

        <template v-slot:header="props">
            <q-tr :props="props">
                <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    class="bg-grey-1"
                    >     
                    {{ col.label }}
                </q-th>
            </q-tr>
        </template>    

    </q-table>

</template>

<script setup lang="ts">
import { useQuasar, type QTableColumn, type QTableProps } from 'quasar';
import { computed } from 'vue';
import type { IMetadata } from 'src/types/IMetadata'
import { IPagination } from 'src/types/IPagination';
import { IRefreshProps } from 'src/types/IRefreshProps';

const $q = useQuasar();

const props = defineProps<{
    columns: QTableColumn[];
    data: unknown[];
    metadata:IMetadata,
    hideTotalRows?:boolean;
}>();

const emit = defineEmits<{
    onRefresh: [props: IRefreshProps];
}>()

const pagination = defineModel<IPagination>('pagination');

const refresh = ( props: IRefreshProps ) => {
  emit('onRefresh', props);
};

const isMobile = computed(() => {
  return $q.screen.lt.md;
});

const rowsPerPageOptions = computed(()=>
    isMobile.value 
        ? [ 10, 15, 20, 25, 30, 50, 100, 200 ]
        : [  5, 10, 15, 20, 25, 30,  35,  50 ]
);


</script>

<style>

</style>