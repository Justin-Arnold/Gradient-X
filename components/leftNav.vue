<template>
    <div class="bg-blue-500 p-2 h-full w-16 flex flex-col items-center shadow-md shadow-neutral-600 z-[999]">
        <nuxt-img
            src="https://gcdnb.pbrd.co/images/t2Dd3ktfvy1R.png?o=1"
            class="rounded aspect-square shadow shadow-blue-800"
        />
        <nav class="flex flex-col w-full gap-2 mt-12">
            <NuxtLink
                v-for="each, index in model"
                :key="index"
                :to="each.route"
                class="text-white grid place-items-center w-full aspect-square"
                active-class="bg-slate-200/30 rounded-xl"
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
</template>

<script setup lang="ts">
import { useSessionStore  } from '~~/stores/session';

const { logout } = useSessionStore();

interface routeItems {
    name: string;
    icon: string;
    route: string;
}

interface props {
    model: routeItems[];
}

const props = defineProps<props>();

</script>