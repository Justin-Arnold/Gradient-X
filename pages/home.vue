<template>
    <NuxtLayout name="staff-portal">
        <div class="flex flex-col gap-4">
            <p class="text-4xl">Welcome, Justin!</p>
            <QuickActions></QuickActions>
            <div class="rounded-lg bg-neutral-50 p-2 w-1/2">
                Recent Submissions
                <div class="h-fit max-h-[200px] rounded-lg p-2 flex flex-col gap-2 overflow-auto">
                    <div v-for="each, index in recentSubmissions" :key="index" class="p-2 bg-blue-300 rounded text-slate-800 flex justify-between">
                        <div><strong>Name:</strong> {{ each.name }}</div>
                        <div><strong>Test:</strong> Math Quiz 4</div>
                        <div><strong>Time:</strong> &lt; 1 hour ago</div>
                    </div>
                </div>
            </div>
        </div>
        <template #SideMenu>test</template>
    </NuxtLayout>
</template>

<script setup lan="ts">

definePageMeta({
    title: 'Home'
})

const recentSubmissions = ref([
    {
        name: 'Justin Arnold'
    }, {
        name: 'Justin Dooley'
    }, {
        name: 'Micah Delaney'
    }, {
        name: 'Rick Rickopolis'
    }, {
        name: 'Jared Robotson'
    }
])

const recentAssignments = ref([
    {
        name: 'History Final (4)',
        time: '4 hours left',
        submissions: 16,
        average: 72
    }, {
        name: 'Math Quiz (2)',
        time: '1 day left',
        submissions: 12,
        average: 92
    }, {
        name: 'Spelling Quiz (1)',
        time: '1 days left',
        submissions: 0,
        average: 0
    }, {
        name: 'Initial Class Assessments',
        time: '2 days left',
        submissions: 10,
        average: 62
    }, {
        name: 'History Makeup Quiz',
        time: '1 week left',
        submissions: 4,
        average: 84
    }
])
</script>