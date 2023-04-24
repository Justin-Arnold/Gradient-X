<template>
    <NuxtLayout name="staff-portal">
        <div class="flex flex-col gap-4">
            <p class="text-4xl dark:text-slate-50">Welcome, Justin!</p>
            <QuickActions></QuickActions>
            <div class="h-60 bg-slate-50 rounded-lg shadow-md p-4 flex flex-col">
                <p class="flex-none">Recent Submissions</p>
                <div class="flex gap-2 grow overflow-hidden">
                    <div v-for="each, index in recentSubmissions" class="h-full aspect-square bg-sky-400 rounded p-2 text-sky-800">
                        <h3 class="text-white text-lg">{{each.name}}</h3>
                        {{each.time}}
                    </div>
                </div>
            </div>
        </div>
        <template #SideMenu>
            <div class="flex flex-col gap-6 px-4">
                <div class="text-2xl flex items-center gap-2 pl-2 py-1 rounded" :class="{' bg-sky-300/50': true}">
                    <Icon name="ic:round-dashboard"></Icon>
                    Dashboard
                </div>
                <div class="text-2xl flex items-center gap-2 pl-2 py-1 rounded" :class="{' bg-sky-300/50': false}">
                    <Icon name="material-symbols:temp-preferences-custom"></Icon>
                    Customize
                </div>
            </div>
        </template>
    </NuxtLayout>
</template>

<script setup lan="ts">

definePageMeta({
    title: 'Home'
})

const recentSubmissions = ref([
    {
        name: 'Justin Arnold',
        time: '2 minutes ago',
    }, {
        name: 'Justin Dooley',
        time: '40 minutes ago',
    }, {
        name: 'Micah Delaney',
        time: '1 hour ago',
    }, {
        name: 'Rick Rickopolis',
        time: '7 hours ago',
    }, {
        name: 'Jared Robotson',
        time: '1 day ago',
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