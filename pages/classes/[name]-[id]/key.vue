<template>
    <div>
        <NuxtLayout name="data-view">
            <ContextMenu ref="cm" />
            <DataTable
                :value="responses"
                v-model:filters="filters"
                selectionMode="multiple"
                v-model:selection="selectedRows"
                contextMenu
                v-model:contextMenuSelection="selectedRow"
                @rowContextmenu="onRowContextMenu"
                paginator
                :rows="20"
                scrollable
                scrollHeight="100%"
                class="flex flex-col max-h-full"
            >
                <template #header>
                    <div class="flex justify-end -m-2">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" :placeholder="`Search ${responses.length} Assignments`" class="h-8 w-80"/>
                        </span>
                    </div>
                </template>
                <Column field="student" header="Student"></Column>
                <Column field="studentId" header="ID"></Column>
                <Column field="class" header="Class"></Column>
                <Column field="missed" header="Missed"></Column>
                <Column field="points" header="Points"></Column>
                <Column field="score" header="Score"></Column>
                <Column field="date" header="Turned In"></Column>
            </DataTable>
            <template #drawer>
                <div class="pl-8 my-2 bg-blue-200 text-blue-700 font-semibold py-2">
                    Current Assignments
                </div>
                <div class="pl-8 my-2">
                    Student Portal
                </div>
                <div class="pl-8 my-2">
                    Archive
                </div>
                <div class="pl-8 my-2">
                    Trash
                </div>
            </template>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import assignmentsService from '~/services/assignments';
import { FilterMatchMode } from 'primevue/api';

const responses = ref([]);

const route = useRoute()

definePageMeta({
    tabs: [
        {
            label: 'Key',
            to: `/key`
        },
        {
            label: 'Responses',
            to: `/responses`
        },
    ]
})

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const selectedRows = ref([]);
const selectedRow = ref();
const menuModel = ref([
    {label: 'View', icon: 'pi pi-fw pi-search', command: () => console.log(selectedRows.value)},
    {label: 'Delete', icon: 'pi pi-fw pi-times', command: () => console.log(selectedRows.value)}
]);
const cm = ref()
const onRowContextMenu = (event: any) => {
    cm.value.show(event.originalEvent);
};


onBeforeMount(async () => {
    console.log(route.params.id)
    if (route.params.id) {
        const resp: any= await assignmentsService.getResponsesById(route.params.id as string)
        console.log(resp)
        responses.value = resp.filteredItems.map((response: any) => {
            return {
                student: response.student.first_name + ' ' + response.student.last_name,
                key: response._id,
                studentId: response.student.student_uid,
                class: response.section.name,
                missed: response.missed.join(', '),
                points: response.stats.points + '/' + response.stats.max_points,
                score: ((response.stats.percentage_avg as number * 100) || 0).toFixed(0)+'%',
                date: JSON.stringify(new Date(response.stats.turnedIn)),
            }
        })
    }
})

</script>