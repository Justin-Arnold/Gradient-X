<template>
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

const isSubNestedRoute = computed(() => {
    console.log(route.fullPath.split('/'))
    return route.fullPath.split('/').length > 4
})

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