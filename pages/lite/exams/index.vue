<template>
    <NuxtLayout name="lite-portal">
        <div class="h-full over-flow-hidden flex flex-col gap-4">
            <div class="card flex item-center">
                <div class="text-3xl flex-grow">Exams</div>
                <div
                    @click="onSave"
                    class="bg-sky-500 dark:bg-slate-600 text-white p-2 rounded cursor-pointer"
                >
                    <div class="h-full flex flex-col justify-center items-center">
                        <div class="text-xs">New Exam</div>
                    </div>
                </div>
            </div>
            <div v-if="!isNestedRoute" class="rounded-lg bg-neutral-50 p-2 h-full shadow-md overflow-hidden">
                <ContextMenu ref="cm" :model="menuModel" />
                <DataTable v-if="!pending" :value="assignments" v-model:filters="tableFilter" selectionMode="multiple" v-model:selection="selectedRows" contextMenu v-model:contextMenuSelection="selectedRow" @rowContextmenu="onRowContextMenu" paginator :rows="20" scrollable scrollHeight="100%" class="flex flex-col h-full">
                    <template #header>
                        <div class="flex justify-between -m-2 items-center">
                            <Button @click="toggleFilterOverlayPanel" icon="pi pi-angle-down" class="h-8" label="Filters"></Button>
                            <PrimeOverlayPanel ref="filterOverlayPanel">
                                <div class="">
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
                                </div>
                            </PrimeOverlayPanel>
                            <div class="h-full items-center">
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <PrimeInputText v-model="tableFilter['global'].value" :placeholder="`Search ${assignments.length} Assignments`" class="h-8 w-80"/>
                                </span>
                            </div>
                        </div>
                    </template>
                    <Column field="name" header="Name">
                        <template #body="slotProps">
                            <NuxtLink :to="`/lite/exams/${encodeURIComponent(slotProps.data.name)}-${slotProps.data.key}/administer`" class="text-blue-500">{{slotProps.data.name}}</NuxtLink>
                        </template>
                    </Column>
                    <Column field="author" header="Author"></Column>
                    <Column field="length" header="Length"></Column>
                    <Column field="turnedIn" header="Turned In"></Column>
                    <Column field="average" header="Average Score"></Column>
                    <Column field="date" header="Date">
                        <template #body="slotProps">
                            {{Intl.DateTimeFormat(undefined, { dateStyle: 'medium'}).format(new Date(slotProps.data.date))}}
                        </template>
                    </Column>
                </DataTable>
                <div v-else>
                    <p>Loading...</p>
                </div>
            </div>
            <NuxtPage></NuxtPage>
        </div>
        <template #SideMenu>

            </template>
    </NuxtLayout>
</template>

<script setup lang="ts">;
import { storeToRefs } from 'pinia';
import { FilterMatchMode } from 'primevue/api';
import type { AssignmentList, AssignmentFilters } from '~/types/assignments';
import assignmentsService from '~/services/assignments';
import useScannerStore from '~/stores/scanner';

const { showScanner } = storeToRefs(useScannerStore());


async function onSave() {
    const resp: any = await assignmentsService.createNewAssignment('Untitled Exam', '', 'exam');
    refreshList();
    navigateTo(`/lite/exams/${encodeURIComponent(resp.name)}-${resp._id}`);
}

const route = useRoute();
definePageMeta({
    layout: 'lite-portal',
    title: 'Exams',
})

const home = ref({
    to: '/lite/exams',
    label: route.meta.title
});

const items = computed(() => {
    if(!route.path.includes('/lite')) return [];
    const splitRoute = route.path.split('/');
    splitRoute.shift();
    if(!splitRoute[2]) return [];
    return [{label: decodeURIComponent(splitRoute[2].split('-')[0])}];
});


// Table Options
const tableFilter = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const onRowContextMenu = (event: any) => {
    cm.value.show(event.originalEvent);
};
const cm = ref();
const selectedRows: Ref<any[]> = ref([]);
const selectedRow = ref();
const menuModel = ref([
    {label: 'Edit', icon: 'pi pi-fw pi-file-edit', command: () => editAssignments(selectedRows.value)},
    {label: 'Clone', icon: 'pi pi-fw pi-clone', command: () => cloneAssignments(selectedRows.value)},
    {label: 'Archive', icon: 'pi pi-fw pi-inbox', command: () => archiveAssignments(selectedRows.value)},
    {label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => deleteAssignments(selectedRows.value)}
]);


async function deleteAssignments(assignments: any[]) {
    console.log(assignments);
    const { data } = await useFetch('/api3/assignments/trash', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body:{
            assignments: assignments.map((assignment: any) => assignment.key)
        }
    })
    refreshList()
}
async function editAssignments(assignments: any[]) {
    const { data } = await useFetch('/api3/assignments/trash', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body:{
            assignments: assignments.map((assignment: any) => assignment.key)
        }
    })
    refreshList()
}
async function cloneAssignments(assignments: any[]) {
    assignments.forEach((assignment: any) => {
        console.log(assignment)
        assignmentsService.createNewAssignment(assignment.name,assignment.Description, assignment.assignment_type)
    })
    // async function onSave() {
    //     const resp: any = await assignmentsService.createNewAssignment(newName.value,newDescription.value, selectedType.value.value)
    //     navigateTo(`/assignments/${resp.name}-${resp._id}/responses`)
    // }
    refreshList()
}

async function archiveAssignments(assignments: any[]) {
    const { data } = await useFetch('http://localhost:3000/api3/assignments/archive', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body:{
            assignments: assignments.map((assignment: any) => assignment.key)
        }
    })
    refreshList()
}

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
    return route.path !== '/lite/exams'
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

const { data, pending, refresh: refreshList } = await useLazyFetch<AssignmentList>('/api3/listReport', {
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
    // pick: ['filteredItems'],
});
refreshList();

const assignments = computed(() => {
    console.log(data.value);
    if (data.value) {
        return data.value.filteredItems.filter(a => a.assignment_type === 'exam').map((item) => {
            return {
                name: item.name,
                key: item._id,
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

const filterOverlayPanel = ref(null);
const toggleFilterOverlayPanel = (event: any) => {
    if(!filterOverlayPanel.value) return;
    (filterOverlayPanel.value as any).toggle(event);
};


</script>

<style scoped>

:deep(.p-datatable-wrapper) {
    @apply grow;
}

:deep(.p-menuitem-text),
:deep(.p-menuitem-separator) {
    @apply !text-black;
}


.p-breadcrumb {
    @apply !bg-transparent border-none p-0 text-3xl py-2 ;
}

:deep(.p-tabmenu) {
    @apply flex-shrink-0
}
</style>