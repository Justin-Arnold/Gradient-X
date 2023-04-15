<template>
    <div class="h-full">
        <NuxtLayout name="data-view">
            <ContextMenu ref="cm" :model="menuModel" />
            <DataTable :value="allSections" v-model:filters="filters" selectionMode="multiple" v-model:selection="selectedRows" contextMenu v-model:contextMenuSelection="selectedRow" @rowContextmenu="onRowContextMenu" paginator :rows="20" scrollable scrollHeight="100%" class="flex flex-col h-full">
                <template #header>
                    <div class="flex justify-end -m-2">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" :placeholder="`Search ${allSections.length} Assignments`" class="h-8 w-80"/>
                        </span>
                    </div>
                </template>
                <Column field="name" header="Name">
                    <template #body="slotProps">
                        <NuxtLink :to="`/classes/${slotProps.data.name}-${slotProps.data.key}/responses`" class="text-blue-500">{{slotProps.data.name}}</NuxtLink>
                    </template>
                </Column>
                <Column field="students" header="Students"></Column>
            </DataTable>
            <NuxtPage>
            </NuxtPage>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import sectionsService from '~/services/sections';
import { useSessionStore } from '~/stores/session';
import { storeToRefs } from 'pinia';
import { FilterMatchMode } from 'primevue/api';


const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const onRowContextMenu = (event: any) => {
    cm.value.show(event.originalEvent);
};

const sessionStore = useSessionStore();
const {
    userId
} = storeToRefs(sessionStore)

const allSections = ref([]);
const cm = ref();
const selectedRow = ref();

const menuModel = ref([
    {label: 'View', icon: 'pi pi-fw pi-search', command: () => console.log(selectedRows.value)},
    {label: 'Delete', icon: 'pi pi-fw pi-times', command: () => console.log(selectedRows.value)}
]);

const selectedRows = ref([]);

definePageMeta({
    layout: 'staff-portal',
    title: 'Classes',
})

const isNestedRoute = computed(() => {
    const route = useRoute()
    return route.path !== '/classes'
})

onBeforeMount(async () => {
    if(!userId.value) return
    const resp: any= await sectionsService.getAllSections()
    //sort out sections with no name
    const filteredItems = resp.filteredItems.filter((section: any) => section.name)
    allSections.value = filteredItems.map((section: any) => {
        return {
            name: `${section.name} (${section.period})`,
            key: section._id,
            students: section.num_students || 0,
        }
    })
})
</script>
