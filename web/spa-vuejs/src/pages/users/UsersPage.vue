<template>
    <q-page class="row items-center justify-evenly">
      <div class="q-pa-md q-gutter-sm full-width row justify-end">
        <q-btn 
          color="green"
          label="Adicionar"
          icon="mdi-plus"
        />
      </div>

      <default-table
        :data="data"
        :columns="usersColumns"
        :metadata="metadata"
        :pagination="pagination"
        @onRefresh="loadingData"
      />
      

      {{ loading }}

    </q-page>
</template>
  
<script setup lang="ts">
  import { onMounted } from 'vue';
  import usersColumns from './UsersColumns';
  import DefaultTable from 'src/components/DefaultTable.vue';
  import {useTable} from 'src/composables/useTable'
  import { IRefreshProps } from 'src/types/IRefreshProps';
  import { onBeforeMount } from 'vue';

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


  const loadingData = async (props: IRefreshProps) =>{
    
    const { descending, page, rowsPerPage, sortBy } = props.pagination;
    
    try
    {
      await fetchData('users', {
        page, 
        perPage: rowsPerPage,
        sortDesc: descending,
        sortBy
      });

      pagination.value = {
        page, 
        perPage: rowsPerPage,
        sortDesc: descending,
        sortBy
      }

    }
    catch(e)
    {
      $q.dialog({
        title: 'Ocorreu um erro',
        message:
          'Um erro interno ocorreu carregando as informações, tente novamente mais tarde.',
        color: 'negative',
      });

    }
  }

  onMounted(()=>{
    
    loadingData({
      pagination: {
        page: pagination.value.page,
        descending: pagination.value.sortDesc,
        rowsPerPage: pagination.value.perPage,
        sortBy: pagination.value.sortBy,
      },
      filter: ''
    });

  })
  
</script>
  