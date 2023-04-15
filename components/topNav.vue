<template>
    <div class="h-14 flex items-center justify-between z-[998] border border-b-slate-800 bg-gradient-to-r from-blue-500 to-blue-700">
        <div class="flex flex-col pl-2 h-full">
            <div class="grow flex items-center">
                <Breadcrumb
                    class="!border-none !bg-transparent !p-0"
                    :home="home"
                    :model="subRoutes"
                />
            </div>
            <div class="h-fit flex items-end gap-4">
                <NuxtLink v-for="each, index in tabs" :to="each.to"  class="text-neutral-200 font-bold px-2 box-border" active-class="!text-blue-500 border border-b-neutral-50 -mb-[1px] border-t-slate-800 border-l-slate-800 border-r-slate-800 rounded-t bg-neutral-50">{{ each.label }}</NuxtLink>
            </div>
        </div>
        <div class="flex gap-2 mx-2 relative h-full items-center text-neutral-50">
            <button class="flex flex-col justify-center items-center w-14">
                <Icon name="ri:list-settings-line" size="24px" class="-mb-1"></Icon>
                <span class="text-xs font-light">Configure</span>
            </button>
            <button class="flex flex-col justify-center items-center w-14">
                <Icon name="ic:baseline-download" size="24px" class="-mb-1"></Icon>
                <span class="text-xs font-light">Download</span>
            </button>
            <button class="flex flex-col justify-center items-center w-14">
                <Icon name="material-symbols:print" size="24px" class="-mb-1"></Icon>
                <span class="text-xs font-light">Print</span>
            </button>
            <div class="w-[1px] rounded-full h-[60%] bg-gray-400 text-transparent">
                .
            </div>
            <button class="flex flex-col justify-center items-center w-14">
                <Icon name="dashicons:admin-page" size="24px" class="-mb-1"></Icon>
                <span class="text-xs font-light">Forms</span>
            </button>
            <button class="flex flex-col justify-center items-center w-14">
                <Icon name="material-symbols:photo-camera" size="24px" class="-mb-1"></Icon>
                <span class="text-xs font-light">Scan</span>
            </button>
            <button class="flex flex-col justify-center items-center w-14">
                <Icon name="ph:magic-wand-fill" size="24px" class="-mb-1"></Icon>
                <span class="text-xs font-light">Transfer</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">

const route = useRoute()

const home = computed(() => {
    const customTitle = route.meta.title || null;
    return {
        label: customTitle as string || '',
    }
});

const tabs = computed(() => {
    const customTabs: object[] | null = route.meta.tabs as object[] || null
    if (!customTabs) return
    const basePath = route.fullPath.split('/').slice(0, -1).join('/')
    const mappedTabs = customTabs.map((tab: any)=> {
        return {
            label: tab.label as string,
            to: `${basePath}${tab.to}`
        }
    })
    return mappedTabs
})


const subRoutes = computed(() => {
    const fullName = route.path.toString() || ''
    const splitName = fullName.split('/').splice(1)
    const slicedName = splitName.slice(1)
    const newSlice = slicedName.map((name, index) => {
        if (index > 0 ) return {}
        return {
            to: `/${splitName.slice(0, index + 1).join('/')}`,
            label: name.split('-')[0]
        }
    })
    console.log(newSlice[0])
    return !!newSlice[0] ? [newSlice[0]] : null
})

</script>

<style scoped>
:deep(.p-menuitem-link) {
    padding: 0px !important;
}

:deep(.p-menuitem-text) {
    color: white !important;
}

:deep(.pi-chevron-right) {
    color: white !important;
    font-size: 12px !important;
}

:deep(.p-tabmenuitem) {
    padding-right: 8px !important;
}

:deep(.p-tabmenu-nav) {
    background: transparent !important;
}


</style>