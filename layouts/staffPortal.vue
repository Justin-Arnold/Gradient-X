<template>
    <div class="h-full flex">
        <div class="bg-sky-500 dark:bg-slate-900 p-2 h-full w-16 flex flex-col items-center z-[998] flex-none">
            <nuxt-img
                src="https://gcdnb.pbrd.co/images/t2Dd3ktfvy1R.png?o=1"
                class="rounded aspect-square"
            />
            <nav class="flex flex-col w-full gap-2 mt-12">
                <NuxtLink
                    v-for="each, index in topLevelRoutes"
                    :key="index"
                    :to="each.route"
                    class="text-white grid place-items-center w-full aspect-square"
                    active-class="bg-slate-200/30 rounded-xl"
                    v-tooltip="each.name"
                >
                    <Icon :name="each.icon" size="28px"></Icon>
                </NuxtLink>
            </nav>
            <div class="flex flex-col grow">
                <div class="grow"></div>
                <div
                    title="Log Out"
                    @click="logout"
                    class="cursor-pointer bg-white text-stone-500 text-lg text-light aspect-square px-1 grid place-items-center rounded-full mb-2">
                    JA
                </div>
            </div>
        </div>
        <div class="h-full relative z-[2] flex-none" :class="isOpen ? 'w-80' : 'w-0'">
            <div v-show="isOpen" class="h-full bg-sky-600 dark:bg-slate-600 text-white px-4">
                <div class="h-full">
                    <div class="text-white font-semibold text-xl flex h-16 items-center mb-4">
                        {{$route.meta.title}}
                    </div>
                    <slot name="SideMenu"></slot>
                </div>
            </div>
            <div class="absolute text-red-800 bg-red-400 top-1/2 right-0 translate-x-[90%] z-[-1] w-6 rounded-r hover:translate-x-full transition-all duration-200 ease-in-out flex justify-end h-8 items-center pr-1">
                <Icon name="mdi:arrow-left" @click="isOpen = !isOpen"></Icon>
            </div>
        </div>
        <div class="grow h-full bg-slate-200 p-8 overflow-hidden dark:bg-slate-800">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSessionStore  } from '~~/stores/session';

const { logout } = useSessionStore();

interface routeItems {
    name: string;
    icon: string;
    route: string;
}
const isOpen = ref(false)

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

const route =  useRoute()
const home = computed(() => {
    const customTitle = route.meta.title || null;
    return {
        label: customTitle as string || '',
    }
});

</script>