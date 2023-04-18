<template>
    <NuxtLayout name="staff-portal">
        <ContextMenu ref="cm" :model="menuModel" />
        <DataTable :value="allSections" v-model:filters="filters" selectionMode="multiple" v-model:selection="selectedRows" contextMenu v-model:contextMenuSelection="selectedRow" @rowContextmenu="onRowContextMenu" paginator :rows="20" scrollable scrollHeight="100%" class="flex flex-col h-full">
            <template #header>
                    <div class="flex justify-between -m-2 items-center">
                        <Button @click="toggleFilterOverlayPanel" icon="pi pi-angle-down" class="h-8" label="Filters"></Button>
                        <PrimeOverlayPanel ref="filterOverlayPanel">
                            <div class="">
                                <div class="overflow-hidden px-2">
                                    <h3 class="text-lg">Filters</h3>
                                    <hr>
                                    <div class="p-float-label mt-12">
                                        <PrimeDropdown v-model="filters.owner" :options="filterOptions.owner" optionLabel="label" optionValue="value" class="w-full"></PrimeDropdown>
                                        <label>View</label>
                                    </div>
                                    <div class="p-float-label mt-8">
                                        <PrimeDropdown v-model="filters.term" :options="filterOptions.term" optionLabel="label" optionValue="value" class="w-full"></PrimeDropdown>
                                        <label>Owners</label>
                                    </div>
                                </div>
                            </div>
                        </PrimeOverlayPanel>
                        <div class="h-full items-center">
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <PrimeInputText v-model="filtersTable['global'].value" :placeholder="`Search ${allSections.length} Assignments`" class="h-8 w-80"/>
                            </span>
                        </div>
                    </div>
                </template>
            <Column field="name" header="Name">
                <template #body="slotProps">
                    <NuxtLink :to="`/classes/${slotProps.data.name}-${slotProps.data.key}/responses`" class="text-blue-500">{{slotProps.data.name}}</NuxtLink>
                </template>
            </Column>
            <Column field="students" header="Students"></Column>
        </DataTable>
        <template #drawer>
            <div>test</div>
            <assignments-filter></assignments-filter>
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { FilterMatchMode } from 'primevue/api';


const filtersTable = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const onRowContextMenu = (event: any) => {
    cm.value.show(event.originalEvent);
};

const filters = reactive({
    view: 'current',
    owner: 'anyone',
    label: 'all',
    term: 'current',
})

const filterOptions = {
    view: [
        {label: 'Current Assignments', value: 'current'},
        {label: 'Student Portal', value: 'student'},
        {label: 'Archive', value: 'archive'},
        {label: 'Trash', value: 'trash'}
    ],
    owner: [
        {label: 'Owned by anyone', value: 'anyone'},
        {label: 'Owned by me', value: 'me'},
        {label: 'Not owned by me', value: 'others'},
    ],
    label: [
        {label: 'All', value: 'all'},
    ],
    term: [
        {label: 'Current Terms', value: 'current'},
        {label: 'All Terms', value: 'all'},
    ]
}

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

const {data, pending, refresh, error} = useFetch('http://localhost:3000/api3/listReport', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        limit: 100,
        lng: 'en',
        sortDir: 1,
        sortKey: 'date',
        reports: {
            overall: true
        },
        list: {
            sectionOwned: 'only',
            term: 'current',
            type: 'section'
        }
    }),
})

watch(data as Ref<any>, (newData) => {
    console.log(newData.filteredItems)
    if (newData.filteredItems) {
        allSections.value = newData.filteredItems.filter((section: any) => section.name).map((section: any) => {
            return {
                name: `${section.name} (${section.period})`,
                key: section._id,
                students: section.num_students || 0,
            }
        })
    }
})

const filterOverlayPanel = ref(null);
const toggleFilterOverlayPanel = (event: any) => {
    if(!filterOverlayPanel.value) return;
    (filterOverlayPanel.value as any).toggle(event);
};
</script>
