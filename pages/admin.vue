<template>
    <NuxtLayout name="staff-portal">
        <h1 class="text-4xl flex items-center gap-2">Admin</h1>
        <TabMenu :model="customTabs" class="mb-4 border-b border-b-slate-400 pb-[0px]"></TabMenu>
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const basePath = route.fullPath.split('/').slice(0, -1).join('/')
const customTabs = ref([
        {
            label: 'Schools',
            to: `/admin/schools`
        },
        {
            label: 'Classes',
            to: `/admin/classes`
        },
        {
            label: 'Students',
            to: `/admin/students`
        },
        {
            label: 'Teachers',
            to: `/admin/teachers`
        },
        {
            label: 'Access Groups',
            to: '/admin/accessGroups'
        },
        {
            label: 'More',
            to: `/admin/more`
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