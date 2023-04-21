<template>
    <div>
        <TheGradeCamScanner />
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
            <Column field="missed" header="Missed"></Column>
            <Column field="points" header="Points"></Column>
            <Column field="score" header="Score"></Column>
            <Column field="date" header="Turned In"></Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import assignmentsService from '~/services/assignments';
import { FilterMatchMode } from 'primevue/api';
import TheGradeCamScanner from '~/components/gradecam/TheGradeCamScanner.vue';

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
    if (route.params.id) {
        const resp: any= await assignmentsService.getResponsesById(route.params.id as string, 'any')
        console.log(resp)
        responses.value = resp.filteredItems.map((response: any) => {
            return {
                student: response.student.first_name + ' ' + response.student.last_name,
                key: response.student._id,
                studentId: response.student.student_uid,
                class: response.section.name,
                missed: response.missed.join(', '),
                points: response.stats.points ? response.stats.points + '/' + response.stats.max_points : '',
                score: response.stats.percentage_avg ? ((response.stats.percentage_avg as number * 100) || 0).toFixed(0)+'%' : '',
                date: response.stats.turnedIn ? Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(response.stats.turnedIn)) : '',
            }
        })
    }
})

</script>
