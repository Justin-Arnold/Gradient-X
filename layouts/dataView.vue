<template>
    <div class="flex flex-col h-screen w-full overflow-none ">
        <div class="flex grow max-h-[calc(100vh-40px)]">
            <div class="bg-stone-100 border-r relative" :class="assignments.isDrawerOpen ? 'w-60' : 'w-8'">
                <Icon :name="assignments.isDrawerOpen ? 'mdi:arrow-collapse-left' : 'mdi:arrow-collapse-right'" size="24px" class="absolute top-2 right-1" @click="toggleDrawer"></Icon>
                <div v-if="assignments.isDrawerOpen" class="pt-12">
                    <slot name="drawer"></slot>
                </div>
            </div>
            <div class="grow h-full bg-neutral-50 overflow-none">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUiStore } from '~/stores/ui'
import { storeToRefs } from 'pinia'

const route =  useRoute()

const tabs = ref([
    {
        label: 'Key',
        to: `${route.fullPath}/key`
    },
    {
        label: 'Responses',
        to: `${route.fullPath}/responses`
    },
])

const uiStore = useUiStore()
const { assignments } = storeToRefs(uiStore)



function toggleDrawer() {
    assignments.value.isDrawerOpen = !assignments.value.isDrawerOpen
}
</script>


