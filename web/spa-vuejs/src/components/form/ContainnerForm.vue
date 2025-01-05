<template>
    <q-card class="column no-wrap" style="min-width: 86vw; height: 86vw;">
        <q-layout view="LHh lpR fff" container class="bg-white text-dark" style="height: 100%;">
            <q-header ref="pageHeaderRef" class="bg-primary">
                <q-toolbar class="bg-grey-2 text-black" :style="isMobile ? '' : 'border-bottom: 1px #e8e8e8 solid;'"
                    style="height: 68px">

                    <div class="flex column justify-center q-ml-md">
                        <p class="q-ma-none text-h6" style="line-height: 1.3em">
                            {{ title }}
                        </p>
                        <p v-if="!subTitle" class="q-ma-none text-subtitle2 text-grey-9">
                            {{ subTitle }}
                        </p>
                    </div>

                    <q-space />
                    
                    <div>
                        <q-btn 
                            icon="close"
                            flat
                            dense
                            @click="onDialogCancel"
                        />

                    </div>

                </q-toolbar>

            </q-header>

            <q-page-container>
                <q-form>
                    <q-card-section>
                        <slot />
                    </q-card-section>
                </q-form>
            </q-page-container>

        </q-layout>
    </q-card>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { useResponsive } from 'src/composables/useResponsive';

defineProps<{
    title: string;
    subTitle?: string;
}>();

const { isMobile } = useResponsive();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();



</script>