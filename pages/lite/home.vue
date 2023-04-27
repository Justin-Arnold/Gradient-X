<template>
    <NuxtLayout name="lite-portal">
        <div class="flex flex-col gap-4">
            <p class="text-4xl dark:text-slate-50">Welcome, Justin!</p>
            <LiteQuickActions></LiteQuickActions>
        </div>
        <template #SideMenu>
            <div class="flex flex-col gap-6 px-4">
                <div class="text-2xl flex items-center gap-2 pl-2 py-1 rounded" :class="{' bg-sky-300/50': true}">
                    <Icon name="ic:round-dashboard"></Icon>
                    Dashboard
                </div>
                <div class="text-2xl flex items-center gap-2 pl-2 py-1 rounded" :class="{' bg-sky-300/50': false}">
                    <Icon name="material-symbols:temp-preferences-custom"></Icon>
                    Customize
                </div>
            </div>
        </template>
    </NuxtLayout>
</template>

<script setup lan="ts">

definePageMeta({
    title: 'Home'
})

</script>