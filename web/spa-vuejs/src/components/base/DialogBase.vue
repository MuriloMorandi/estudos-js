<template>
    <q-dialog v-model="showDialog">
      <q-layout view="Lhh lpR fff" container class="bg-white text-dark">
        <q-header class="bg-secondary">
          <q-toolbar>
            
            <q-toolbar-title>{{ title }}</q-toolbar-title>
            
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-footer class="bg-secondary text-white">
          <q-toolbar>
            <q-toolbar-title>{{ footer }}</q-toolbar-title>
          </q-toolbar>
        </q-footer>


        <q-page-container>
          <q-page padding>
            <slot></slot>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
</template>

<script setup lang="ts">

const showDialog = defineModel('showDialog' ,{ default: false, });

defineProps({
  title: String,
  footer: String,
});

</script>