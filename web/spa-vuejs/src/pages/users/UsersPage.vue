<template>
  <q-page class="">
    
    <div class="q-pa-md q-gutter-sm full-width row ">
      <div class="column">
        <span class="text-h5 text-weight-bolder" >Usuarios</span>
        <span class="text-subtitle2 text-weight-light">Cadastro de usuarios</span>
      </div>
      <q-space/>
      <q-btn color="green" label="Adicionar" icon="mdi-plus" />
    </div>

    <div class="full-width">

      <default-table 
        :data="data" 
        :columns="usersColumns" 
        :metadata="metadata" 
        :loading="loading"
        v-model:pagination="pagination"
        @onRefresh="onRefresh" 
      />
      
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import usersColumns from './UsersColumns';
import DefaultTable from 'src/components/DefaultTable.vue';
import { useTable } from 'src/composables/useTable'
import { IRefreshProps } from 'src/types/IRefreshProps';

const {
  $q,
  data,
  metadata,
  loading,
  pagination,
  fetchData,
} = useTable({
  sortByDefault: 'name'
});


const onRefresh = async (props: IRefreshProps) => {

  const { descending, page, rowsPerPage, sortBy } = props.pagination;

  try {
    console.log(props.pagination)

    await fetchData('users', {
      page,
      perPage: rowsPerPage,
      sortDesc: descending,
      sortBy
    });
    console.log(props.pagination)

    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;

  }
  catch (e) {
    $q.dialog({
      title: 'Ocorreu um erro',
      message:
        'Um erro interno ocorreu carregando as informações, tente novamente mais tarde.',
      color: 'negative',
    });

  }
}

onMounted(() => {

  onRefresh({
    pagination: {
      page: pagination.value.page,
      descending: pagination.value.descending,
      rowsPerPage: pagination.value.rowsPerPage,
      sortBy: pagination.value.sortBy,
    },
    filter: ''
  });

})

</script>