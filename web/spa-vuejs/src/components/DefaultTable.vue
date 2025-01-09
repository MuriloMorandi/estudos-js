<template>
  <div class="full-width q-pa-md q-gutter-sm">
    <div class="row justify-end">
      <q-btn color="green" label="Adicionar" icon="mdi-plus" @click="onClickAdd" />
    </div>

    <div class="shadow-1 rounded-borders">
      <q-table
        flat
        ref="tableRef"
        hide-pagination
        :rows="data"
        :columns="columns"
        row-key="id"
        v-model:pagination="pagination"
        :loading="loading"
        :filter="filter"
        binary-state-sort
        @request="onRefresh"
        :rows-per-page-options="rowsPerPageOptions"
        :visible-columns="visibleColumns"
        class="full-width"
      >
        <template v-if="!isMobile" v-slot:top-left>
          <q-btn label="Colunas" icon="mdi-cogs" outline @click="handleOpenModal" />

          <q-input
            dense
            filled
            label="Pesquisa"
            stack-labe
            debounce="300"
            v-model="filter"
            class="q-ml-md"
          >
            <template v-slot:append>
              <q-icon name="mdi-magnify" />
            </template>
          </q-input>
        </template>

        <template v-slot:[selectSlot]>
          <q-btn v-if="isMobile" label="Colunas" outline @click="handleOpenModal" />

          <q-badge
            v-if="!hideTotalRows"
            :class="[
              'text-subtitle2 d-flex justify-center align-center non-selectable',
              !isMobile && 'full-width',
            ]"
            style="height: 38px"
            color="grey-5"
            outline
          >
            <span class="text-grey-8"> Total de Registros: {{ metadata.total }} </span>
          </q-badge>
        </template>

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props" class="bg-grey-1">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
      </q-table>

      <div class="row justify-end items-center q-mt-md">
        <div class="q-mr-md">
          <q-pagination
            v-model="pagination.page"
            color="grey-8"
            :max="metadata.totalPages"
            :max-pages="5"
            @update:model-value="emit('onRefresh', { pagination: pagination })"
            size="md"
          />
        </div>
        <div class="row">
          <span class="content-center q-pr-sm">Linhas por pagina:</span>
          <q-select
            dense
            borderless
            :options="rowsPerPageOptions"
            v-model="pagination.rowsPerPage"
            @update:model-value="emit(`onRefresh`, { pagination: pagination })"
          />
        </div>
      </div>
    </div>
  </div>

  <q-dialog v-model="hideDialog">
    <q-card style="min-width: 400px; width: 40vw">
      <q-card-section
        class="row bg-grey-2"
        style="height: fit-content"
        :style="isMobile ? '' : 'border-bottom: 1px #e8e8e8 solid;'"
      >
        <p class="q-ma-none text-h6 non-selectable">Editar Colunas</p>
        <q-space />
        <q-btn icon="close" flat dense @click="handleOpenModal" />
      </q-card-section>

      <q-card-section>
        <q-list bordered separator>
          <q-item v-for="col in columns" :key="col.name" avatar>
            <q-checkbox v-model="visibleColumns" :label="col.label" :val="col.name" />
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions class="flex no-wrap justify-end">
        <q-btn label="Redefinir" icon="mdi-table-refresh" color="warning" />
        <q-btn label="Salvar" icon="mdi-content-save" color="green" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuasar, type QTableColumn, type QTableProps } from 'quasar'
import { computed, onMounted } from 'vue'
import type { IMetadata } from 'src/types/IMetadata'
import { IPagination } from 'src/types/IPagination'
import { IRefreshProps } from 'src/types/IRefreshProps'
import { ref } from 'vue'
import { useResponsive } from 'src/composables/useResponsive'

const { isMobile } = useResponsive()
const tableRef = ref()

const filter = ref('')
const props = defineProps<{
  columns: QTableColumn[]
  data: unknown[]
  metadata: IMetadata
  hideTotalRows?: boolean
  loading: boolean
}>()

const emit = defineEmits<{
  onRefresh: [props: IRefreshProps]
  onAdd: []
}>()

const pagination = defineModel<{
  page: number
  rowsPerPage: number
  descending: boolean
  sortBy: string
}>('pagination', { required: true })

const onRefresh = (props: IRefreshProps) => {
  emit('onRefresh', props)
}

const onClickAdd = () => {
  emit('onAdd')
}

const hideDialog = ref(false)

const rowsPerPageOptions = computed(() =>
  isMobile.value ? [5, 10, 15, 20, 25, 30, 35, 50] : [1, 10, 15, 20, 25, 30, 50, 100, 200],
)

const selectSlot = computed(() => (isMobile.value ? 'top' : 'top-right'))

const visibleColumns = ref<string[]>(props.columns.map((e) => e.name))

const handleOpenModal = () => {
  hideDialog.value = !hideDialog.value
}

onMounted(() => {
  tableRef.value.requestServerInteraction()
})
</script>

<style></style>
