<template>
    <NuxtLayout name="staff-portal">
        <ContextMenu ref="cm" :model="menuModel" />
        <DataTable v-if="!pending" :value="assignments" v-model:filters="tableFilter" selectionMode="multiple" v-model:selection="selectedRows" contextMenu v-model:contextMenuSelection="selectedRow" @rowContextmenu="onRowContextMenu" paginator :rows="20" scrollable scrollHeight="100%" class="flex flex-col max-h-full">
            <template #header>
                <div class="flex justify-end -m-2">
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <PrimeInputText v-model="tableFilter['global'].value" :placeholder="`Search ${assignments.length} Assignments`" class="h-8 w-80"/>
                    </span>
                </div>
            </template>
            <Column field="name" header="Name">
                <template #body="slotProps">
                    <NuxtLink :to="`/assignments/${slotProps.data.name}-${slotProps.data.key}/responses`" class="text-blue-500">{{slotProps.data.name}}</NuxtLink>
                </template>
            </Column>
            <Column field="assignment_type" header="Type"></Column>
            <Column field="author" header="Author"></Column>
            <Column field="length" header="Length"></Column>
            <Column field="turnedIn" header="Turned In"></Column>
            <Column field="average" header="Average Score"></Column>
            <Column field="date" header="Date"></Column>
        </DataTable>
        <div v-else>
            <p>Loading...</p>
        </div>
        <template #SideMenu>
                <div class="overflow-hidden px-2">
                    <h3 class="text-lg">Filters</h3>
                    <hr>
                    <div class="p-float-label mt-12">
                        <PrimeDropdown v-model="filters.view" :options="filterOptions.view" optionLabel="label" optionValue="value" class="w-full"></PrimeDropdown>
                        <label>View</label>
                    </div>
                    <div class="p-float-label mt-8">
                        <PrimeDropdown v-model="filters.owner" :options="filterOptions.owner" optionLabel="label" optionValue="value" class="w-full"></PrimeDropdown>
                        <label>Owners</label>
                    </div>
                    <div class="p-float-label mt-8">
                        <PrimeDropdown v-model="filters.label" :options="filterOptions.label" optionLabel="label" optionValue="value" class="w-full"></PrimeDropdown>
                        <label>Labels</label>
                    </div>
                    <div class="p-float-label mt-8">
                        <PrimeDropdown v-model="filters.term" :options="filterOptions.term" optionLabel="label" optionValue="value" class="w-full"></PrimeDropdown>
                        <label>Term</label>
                    </div>
                </div>
            </template>
    </NuxtLayout>
</template>

<script setup lang="ts">;
import { FilterMatchMode } from 'primevue/api';
import type { AssignmentList, AssignmentFilters } from '~/types/assignments';

definePageMeta({
    layout: 'staff-portal',
    title: 'Assignments',
})

// Table Options
const tableFilter = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const onRowContextMenu = (event: any) => {
    cm.value.show(event.originalEvent);
};
const cm = ref();
const selectedRow = ref();
const menuModel = ref([
    {label: 'View', icon: 'pi pi-fw pi-search', command: () => console.log(selectedRows.value)},
    {label: 'Delete', icon: 'pi pi-fw pi-times', command: () => console.log(selectedRows.value)}
]);
const selectedRows = ref([]);


const filters: AssignmentFilters = reactive({
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

const isNestedRoute = computed(() => {
    const route = useRoute()
    return route.path !== '/assignments'
})

const trashed = computed(() => {
    if (filters.view === 'trash') {
        return 'only'
    } else {
        return 'disallow'
    }
})

const sportal = computed(() => {
    if (filters.view === 'student') {
        return 'only'
    } else {
        return 'disallow'
    }
})

const archived = computed(() => {
    if (filters.view === 'archive') {
        return 'only'
    } else {
        return 'disallow'
    }
})

const owned = computed(() => {
    if (filters.owner === 'anyone') {
        return 'allow'
    } else if (filters.owner === 'me') {
        return 'only'
    } else {
        return 'disallow'
    }
})

const term = computed(() => {
    if (filters.term === 'current') {
        return 'current'
    } else {
        return 'all'
    }
})

const { data, pending } = await useLazyFetch<AssignmentList>('http://localhost:3000/api3/listReport', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
    body: {
        limit: 100,
        lng: 'en',
        sortDir: 1,
        sortKey: 'date',
        reports: {
            overall: true
        },
        list: {
            archived,
            owned,
            term,
            trashed,
            sportal,
            type: 'assignment'
        }
    },
    pick: ['filteredItems'],
});

const assignments = computed(() => {
    if (data.value) {
        return data.value.filteredItems.map((item) => {
            return {
                name: item.name,
                assignment_type: item.assignment_type,
                author: item.author.first.slice(0,1).toUpperCase() + item.author.last.slice(0, 1).toUpperCase(),
                length: item.length,
                turnedIn: item.stats.count || 0,
                average: ((item.stats.percentage_avg * 100) || 0).toFixed(0)+'%',
                date: item.date,
            };
        });
    }
    return [];
});



</script>