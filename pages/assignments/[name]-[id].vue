<template>
    <h1 class="text-4xl flex items-center gap-2">{{ $route.params.name }}<Icon name="mdi:pencil" class="text-slate-600 p-1 hover:cursor-pointer"></Icon></h1>
    <TabMenu :model="customTabs" class="mb-4 border-b border-b-slate-400 pb-[0px]"></TabMenu>
    <NuxtPage></NuxtPage>
</template>

<script setup lang="ts">

const route = useRoute()
const basePath = route.fullPath.split('/').slice(0, -1).join('/')
const customTabs = ref([
        {
            label: 'Key',
            to: `${basePath}/key`
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