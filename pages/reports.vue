<template>
    <NuxtLayout name="staff-portal">
        <h1 class="text-4xl flex items-center gap-2">Reporting</h1>
        <TabMenu :model="customTabs" class="mb-4 border-b border-b-slate-400 pb-[0px]"></TabMenu>
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const basePath = route.fullPath.split('/').slice(0, -1).join('/')
const customTabs = ref([
        {
            label: 'Assignments',
            to: `/reports/assignments`
        },
        {
            label: 'Students',
            to: `/reports/students`
        },
        {
            label: 'Classes',
            to: `/reports/classes`
        },
        {
            label: 'Teachers',
            to: `/reports/teachers`
        },
        {
            label: 'Schools',
            to: '/reports/schools'
        },
        {
            label: 'Standards',
            to: `/reports/standards`
        },
        {
            label: 'Custom',
            to: `/reports/custom`
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