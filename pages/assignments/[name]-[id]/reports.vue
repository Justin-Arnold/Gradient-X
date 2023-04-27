<template>
    <div class="rounded-lg bg-neutral-50 p-2 h-full shadow-md overflow-hidden grid place-items-center">
        Not Implemented
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

const files: Ref<any[]> = ref([])
const assignment = ref(null)


onBeforeMount(async () => {
    const resp:any = await assignmentsService.getAssignmentById(route.params.id as string)
    console.log(resp)
    if (resp) {
        files.value = resp.attachments.map((a: any) => {
            return {
                filename: a.filename.split(".")[0],
                filetype: a.mimetype,
                filesize: Math.round(a.filesize / 10000) + 'MB'
            }
        })
    }
})

async function onUpload(event: any) {
    console.log(event)
    event.files.forEach(async (file: any) => {
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

        const file2 = await new File([blob], "test");
        console.log('file test', typeof file2, file2)
        const resp = await $fetch(`http://localhost:3000/api3/assignments/${route.params.id}/attach`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: {
                qqfile: file2
            }
        })
        console.log(file2)
    })
}

</script>

<style scoped>

:deep(.p-datatable-wrapper) {
    @apply grow;
}
:deep(.p-fileupload) {
    @apply flex flex-col;
}
:deep(.p-fileupload-content) {
    @apply grow;
}
</style>