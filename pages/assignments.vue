<template>
    <div class="h-full">
        <NuxtLayout name="data-view" v-if="!isNestedRoute">
            <ContextMenu ref="cm" :model="menuModel" />
            <DataTable  :value="allAssignments" v-model:filters="filters" selectionMode="multiple" v-model:selection="selectedRows" contextMenu v-model:contextMenuSelection="selectedRow" @rowContextmenu="onRowContextMenu" paginator :rows="20" scrollable scrollHeight="100%" class="flex flex-col max-h-full">
                <template #header>
                    <div class="flex justify-end -m-2">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" :placeholder="`Search ${allAssignments.length} Assignments`" class="h-8 w-80"/>
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
            <template #drawer>
                <div class="overflow-hidden px-2">
                    <h3 class="text-lg">Filters</h3>
                    <hr>
                    <div class="p-float-label mt-12">
                        <PrimeDropdown v-model="selectedView" :options="viewOptions" optionLabel="label" optionValue="value" class="w-full"></PrimeDropdown>
                        <label>View</label>
                    </div>
                    <div class="p-float-label mt-8">
                        <PrimeDropdown v-model="selectedOwner" :options="ownerOptions" optionLabel="label" optionValue="value" class="w-full"></PrimeDropdown>
                        <label>Owners</label>
                    </div>
                    <div class="p-float-label mt-8">
                        <PrimeDropdown v-model="selectedLabel" :options="labelOptions" optionLabel="label" optionValue="value" class="w-full"></PrimeDropdown>
                        <label>Labels</label>
                    </div>
                    <div class="p-float-label mt-8">
                        <PrimeDropdown v-model="selectedTerm" :options="termOptions" optionLabel="label" optionValue="value" class="w-full"></PrimeDropdown>
                        <label>Term</label>
                    </div>

                </div>

            </template>
        </NuxtLayout>
        <NuxtPage></NuxtPage>
    </div>
</template>

<script setup lang="ts">
import assignmentsService from '~/services/assignments';
import { useSessionStore } from '~/stores/session';
import { useUiStore } from '~/stores/ui';
import { storeToRefs } from 'pinia';
import { FilterMatchMode } from 'primevue/api';


const selectedView = ref('current');
const viewOptions = ref([
    {label: 'Current Assignments', value: 'current'},
    {label: 'Student Portal', value: 'student'},
    {label: 'Archive', value: 'archive'},
    {label: 'Trash', value: 'trash'}
])
const selectedOwner = ref('anyone');
const ownerOptions = ref([
    {label: 'Owned by anyone', value: 'anyone'},
    {label: 'Owned by me', value: 'me'},
    {label: 'Not owned by me', value: 'others'},
])
const selectedLabel = ref('all');
const labelOptions = ref([
    {label: 'All', value: 'all'},
])
const selectedTerm = ref('current');
const termOptions = ref([
    {label: 'Current Terms', value: 'current'},
    {label: 'All Terms', value: 'all'},
])

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const onRowContextMenu = (event: any) => {
    cm.value.show(event.originalEvent);
};

const sessionStore = useSessionStore();
const uiStore = useUiStore();
const {
    userId
} = storeToRefs(sessionStore)

const { navDirection } = storeToRefs(uiStore)

const allAssignments = ref([]);
const cm = ref();
const selectedRow = ref();

const menuModel = ref([
    {label: 'View', icon: 'pi pi-fw pi-search', command: () => console.log(selectedRows.value)},
    {label: 'Delete', icon: 'pi pi-fw pi-times', command: () => console.log(selectedRows.value)}
]);

const selectedRows = ref([]);

definePageMeta({
    layout: 'staff-portal',
    title: 'Assignments',
})

const isNestedRoute = computed(() => {
    const route = useRoute()
    return route.path !== '/assignments'
})

onBeforeMount(async () => {
    if(!userId.value) return
    const resp: any= await assignmentsService.getAllAssignments(userId.value)
    allAssignments.value = resp.filteredItems.map((assignment: any) => {
        return {
            name: assignment.name,
            key: assignment._id,
            assignment_type: assignment.assignment_type,
            author: assignment.author.first,
            length: assignment.length,
            turnedIn: assignment.stats.count || 0,
            average: ((assignment.stats.percentage_avg as number * 100) || 0).toFixed(0)+'%',
            date: JSON.stringify(new Date(assignment.date)),

        }
    })
})

const columns = [
    {type: 'text', title: 'Author', key: 'author'},
    {type: 'text', title: 'Length', key: 'length'},
    {type: 'text', title: 'Turned In', key: 'turnedIn'},
    {type: 'text', title: 'Average Score', key: 'average'},
    {type: 'text', title: 'Due Date', key: 'date'}
]


</script>