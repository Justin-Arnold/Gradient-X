<template>
    <div>
        <NuxtLayout name="data-view">
            <ContextMenu ref="cm" />
            <DataTable
                :value="answerKey"
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
                <Column field="label" header="Q #"></Column>
                <Column field="choices" header="Answer">
                    <template #body="slotProps">
                        <span v-html="slotProps.data.choices"></span>
                    </template>
                </Column>
                <Column field="type" header="Type"></Column>
                <Column field="points" header="Points"></Column>
                <Column field="standards" header="Standards"></Column>
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

const answerKey = ref([]);


onBeforeMount(async () => {
    const resp:any = await assignmentsService.getAssignmentById(route.params.id as string)
    if (resp) {
        answerKey.value = resp.answer_keys[0].questions.map((q: any) => {
            const correctIndicesString = Object.keys(q.pmap)[0]
            const correctIndices = correctIndicesString.split('')
            const choices = q.choices.split('')
            //create a string of choices where the correct ones are bold
            const choicesWithCorrectBolded = choices.map((c: string, i: number) => {
                if (correctIndices.includes(i.toString())) {
                    return `<b class="text-blue-500">${c}</b>`
                } else {
                    return `<span class="text-neutral-300">${c}</span>`
                }
            }).join('<span class="text-neutral-300">, </span>')
            return {
                label: q.label,
                choices: choicesWithCorrectBolded,
                type: q.type,
                points: Object.values(q.pmap)[0],
                standards: q.stds.join(', ') || 'n/a'
            }
        })
        console.log(resp.answer_keys[0].questions)
    }
})

</script>