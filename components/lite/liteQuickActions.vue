<script setup lang="ts">
import { Icon } from '@iconify/vue';
import assignmentsService from '~/services/assignments';

async function onSave() {
    const resp: any = await assignmentsService.createNewAssignment(newName.value,newDescription.value, selectedType.value.value)
    navigateTo(`/lite/exams/${resp.name}-${resp._id}/responses`)
}

const newName = ref('');
const newDescription = ref('');

const assignmentTypes = [
    {
        label: 'Automatic',
        value: 'exam'
    },
    {
        label: 'Manual',
        value: 'obs'
    },
    {
        label: 'Score Only',
        value: 'scored'
    }
]
const selectedType = ref({
        label: 'Automatic',
        value: 'exam'
    });

</script>

<template>
    <div class="rounded-lg bg-neutral-50 dark:bg-slate-900 p-2 w-full shadow-md">
        <div class="ml-2 dark:text-slate-50">Quick Actions</div>
        <div class="my-2 h-24 rounded-lg  flex gap-2">
            <ModalButton>
                <div class="h-full flex flex-col justify-between items-end">
                    <div class="text-xs">Create Exam</div>
                    <Icon icon="mdi:plus" class="text-2xl" />
                </div>
                <template #body="{ toggleModal }">
                    <h3 class="text-lg font-semibold">Create New Exam</h3>
                    <hr/>
                    <div class="h-full flex flex-col gap-2 mt-2">
                        <div class="flex flex-col">
                            Name
                            <TextInput v-model="newName" />
                        </div>
                        <div class="flex flex-col">
                            Description (optional)
                            <TextInput v-model="newDescription" />
                        </div>
                        <div class="flex flex-col">
                            Grading Type
                            <SelectButton :options="assignmentTypes" class="whitespace-nowrap !flex " v-model="selectedType">
                                <template #option="slotProps">
                                    <p class="text-sm">{{ slotProps.option.label }}</p>
                                </template>
                            </SelectButton>
                        </div>
                        <div class="grow flex flex-col justify-end">
                            <div class="flex justify-end gap-2">
                                <Button label="Cancel" @click="toggleModal" outlined size="small"/>
                                <Button label="Create" @click="onSave" size="small"/>
                            </div>
                        </div>
                    </div>
                </template>
            </ModalButton>
            <ModalButton>
                <div class="h-full flex flex-col justify-between items-end">
                    <div class="text-xs">Manage examinees</div>
                    <Icon icon="ic:outline-people" class="text-2xl" />
                </div>
                <template #body="{ toggleModal }">
                    <div class="text-black" @click="toggleModal">
                        I am a modal
                    </div>
                </template>
            </ModalButton>
        </div>
    </div>
</template>

<style scoped>

:deep(.p-button) {
    @apply w-1/3 px-4 py-2 grid place-items-center
}

</style>