<template>
    <NuxtLayout name="staff-portal">
        <div class="rounded-lg bg-neutral-50 p-2 shadow-md h-full">
            <ContextMenu ref="cm" :model="menuModel" />
            <DataTable :value="students" v-model:filters="filters" selectionMode="multiple" v-model:selection="selectedRows" contextMenu v-model:contextMenuSelection="selectedRow" @rowContextmenu="onRowContextMenu" paginator :rows="20" scrollable scrollHeight="100%" class="flex flex-col h-full">
                <template #header>
                        <div class="flex justify-between -m-2 items-center">
                            <!-- <Button @click="toggleFilterOverlayPanel" icon="pi pi-angle-down" class="h-8" label="Filters"></Button>
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
                            </PrimeOverlayPanel> -->
                            <div class="h-full items-center">
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <PrimeInputText v-model="filtersTable['global'].value" :placeholder="`Search ${students.length} Assignments`" class="h-8 w-80"/>
                                </span>
                            </div>
                        </div>
                    </template>
                <Column field="name" header="Name">
                    <template #body="slotProps">
                        <NuxtLink class="text-blue-500">{{slotProps.data.name}}</NuxtLink>
                    </template>
                </Column>
                <Column field="acccessCode" header="Access Code"></Column>
                <Column field="uid" header="ID"></Column>
                <Column field="classes" header="Classes"></Column>
                <Column field="turnedIn" header="Turned In"></Column>
                <Column field="average" header="Average"></Column>
            </DataTable>
        </div>
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
        {label: 'All Classes', value: 'anyone'},
        {label: 'My Classes', value: 'me'},
        {label: 'Not My Classes', value: 'others'},
    ],
    label: [
        {label: 'All', value: 'all'},
    ],
    term: [
        {label: 'Current Terms', value: 'current'},
        {label: 'All Terms', value: 'all'},
    ]
}

const students = ref([]);
const cm = ref();
const selectedRow = ref();

const menuModel = ref([
    {label: 'View', icon: 'pi pi-fw pi-search', command: () => console.log(selectedRows.value)},
    {label: 'Delete', icon: 'pi pi-fw pi-times', command: () => console.log(selectedRows.value)}
]);

const selectedRows = ref([]);

definePageMeta({
    layout: 'staff-portal',
    title: 'Students',
})

const isNestedRoute = computed(() => {
    const route = useRoute()
    return route.path !== '/students'
})

const {data, pending, refresh, error} = useFetch('/api3/listReport', {
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
            sectionOwned: "only",
            academicYear: "current",
            type: "student",
            term: "current"
        }
    }),
})

watch(data as Ref<any>, (newData) => {
    if (newData.filteredItems) {
        console.log(newData.filteredItems)
        students.value = newData.filteredItems.filter((section: any) => !section.__placeholder).map((student: any) => {
            console.log(student)
            return {
                name: `${student.first_name} ${student.last_name}`,
                key: student._id,
                accessCode: student.login_code,
                uid: student.student_uid,
                classes: student.num_sections,
                turnedIn: student.stats.count || 0,
                average: ((student.stats.percentage_avg * 100) || 0).toFixed(0)+'%',
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
