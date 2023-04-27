<template>
    <NuxtLayout name="lite-portal">
        <div class="card flex items-center">
            <PrimeInputText class="flex-shrink-0" type="text" v-model="examName" />
            <div class="flex-grow"></div>
            <div class="flex items-end mr-4">
                <Icon @click="showScanner = !showScanner" class="cursor-pointer" name="material-symbols:camera-video" size="24px"></Icon>
            </div>
        </div>
        <TabMenu :model="customTabs" class="mb-4 border-b border-b-slate-400 pb-[0px]"></TabMenu>
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useScannerStore from '~/stores/scanner';

const route = useRoute()
console.log(route.params)
const examName = ref(route.params.name);
const examId = computed(() => route.params.id);

// const exam = useLazyFetch(`/api3/assignments/${examId.value}`)
const { showScanner } = storeToRefs(useScannerStore());

const basePath = route.fullPath.split('/').slice(0, -1).join('/')
const customTabs = ref([
        {
            label: 'Administer',
            to: `${basePath}/administer`
        },
        {
            label: 'Examinees',
            to: `${basePath}/examinees`
        },
        {
            label: 'Answers',
            to: `${basePath}/key`,
        },
        {
            label: 'Responses',
            to: `${basePath}/responses`
        },
])

</script>

<style>
    .p-tabmenu,
    .p-tabmenu-nav,
    .p-tabmenuitem,
    .p-menuitem-link,
    .p-menuitem-text,
    .p-tabmenuitem-icon {
        background: transparent !important;
    }

    .p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
        border-width: 0 0 3px 0 !important;
    }
</style>