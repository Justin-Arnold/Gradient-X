<template>
    <NuxtLayout name="data-view">
        <n-data-table
            v-if="!isNestedRoute"
            :columns="columns"
            :data="allAssignments || []"
            :pagination="false"
            :bordered="true"
        />
        <NuxtPage>
        </NuxtPage>
    </NuxtLayout>
</template>

<script setup lang="ts">
import assignmentsService from '~/services/assignments';
import { useSessionStore } from '~/stores/session';
import { storeToRefs } from 'pinia';

const sessionStore = useSessionStore();
const {
    userId
} = storeToRefs(sessionStore)

const allAssignments = ref([]);

definePageMeta({
    layout: 'staff-portal',
})

const isNestedRoute = computed(() => {
    const route = useRoute()
    return route.path !== '/assignments'
})

onBeforeMount(async () => {
    if(!userId.value) return
    const resp: any= await assignmentsService.getAllAssignments(userId.value)
    allAssignments.value = resp.filteredItems.map((assignment: any) => {
        console.log(new Date(assignment.date))
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
    console.log(allAssignments.value)
})

const columns = [
    {type: 'selection', title: 'no', rowKey: 'no'},
    {type: 'text', title: 'Name', key: 'name',
        render (row: any) {
            return h(
                'span',
                {
                    class: 'text-blue-500 cursor-pointer',
                    onClick: () => {
                        navigateTo(`/assignments/${row.key}`)
                    }
                }, row.name
            )
        }},
    {type: 'text', title: 'Type', key: 'assignment_type'},
    {type: 'text', title: 'Author', key: 'author'},
    {type: 'text', title: 'Length', key: 'length'},
    {type: 'text', title: 'Turned In', key: 'turnedIn'},
    {type: 'text', title: 'Average Score', key: 'average'},
    {type: 'text', title: 'Due Date', key: 'date'}
]


</script>