<template>
    <div class="bg-gray-500 h-full w-fit flex flex-col items-center shadow-md shadow-neutral-600 z-[999]">
            <div class="mt-1 px-1">
                <nuxt-img src="https://gcdnb.pbrd.co/images/t2Dd3ktfvy1R.png?o=1" class="rounded aspect-square w-12"/>
            </div>
            <nav class="flex flex-col gap-4 mt-8">
                <NuxtLink
                    v-for="each, index in model"
                    :key="index"
                    :to="each.route"
                    class="text-white grid place-items-center text-[8px] px-1"
                    active-class="bg-white !text-blue-500"
                >
                    <Icon :name="each.icon" size="24px"></Icon>
                    {{ each.name }}
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