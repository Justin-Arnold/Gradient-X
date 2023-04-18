<template>
    <div class="flex h-screen w-screen overflow-hidden bg-slate-200">
        <leftNav :model="topLevelRoutes"></leftNav>
        <div class="h-full grow overflow-hidden">
            <slot></slot>
        </div>
    </div>

</template>

<script setup lang="ts">

const topLevelRoutes = [
    {
        name: 'Home',
        icon: 'ic:round-home',
        route: '/home'
    },
    {
        name: 'Assignments',
        icon: 'mdi:paper',
        route: '/assignments'
    },
    {
        name: 'Classes',
        icon: 'fluent:people-community-24-filled',
        route: '/classes'
    },
    {
        name: 'Students',
        icon: 'ph:person-fill',
        route: '/students'
    },
    {
        name: 'Reports',
        icon: 'mdi:graph-bar',
        route: '/reports'
    },
    {
        name: 'Teachers',
        icon: 'mdi:teacher',
        route: '/teachers'
    },
    {
        name: 'Admin',
        icon: 'mdi:cog',
        route: '/admin'
    }
]

</script>