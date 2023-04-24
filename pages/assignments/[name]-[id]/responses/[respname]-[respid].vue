<template>
    <div class="flex overflow-hidden h-full">
        <div class="shrink-0">
            <label class="text-slate-600 -mb-4">Student</label><br/>
            <PrimeDropdown v-model="selectedStudent" :options="respondedStudents" optionLabel="label" optionValue="value" class="w-60 mb-8"></PrimeDropdown>
            <div class="w-60 flex justify-between -mb-6 text-slate-600" >
                <div>Score: {{ pending ? '?' : data.score }}/{{ pending ? '?' : data.max_score }}</div>
            </div><br/>
            <PrimeProgressBar :value="Math.round((data.score / data.max_score) * 100)" class="w-60"></PrimeProgressBar>
        </div>

        <div class="grow px-4 flex flex-col gap-2 overflow-auto h-full">
            <div class="grow overflow-y-auto overflow-x-hidden h-full p-2">
                <div v-for="each, index in data.questions" class="bg-slate-50 text-slate-800 p-2 flex flex-col h-full shadow-md shadow-neutral-400 shrink-0 rounded-lg" :class="index === activeResponse ? 'block' : 'hidden'">
                    <div v-if="each.type === 'rubric'" class="grow flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center">
                            <div class="flex gap-2 items-center">
                                <p>{{ each.label }}.</p>
                                <p class="text-xs rounded text-slate-500">Write A short 4 paragraph mini-essay on the native habitat of the narwhal</p>
                            </div>
                            <span class="flex justify-center items-center gap-2 bg-sky-400 py-1 w-32 rounded text-white cursor-pointer overflow-hidden">
                                <p class="grow text-center" @click="autoGrade('Write A short 4 paragraph mini-essay on the native habitat of the narwhal', each.student_text.replace(/<\/?[^>]+(>|$)/g, ''), each.points)">
                                    {{ isGrading ? '...' : 'Auto Grade'}}
                                </p>
                                <Icon class="w-[28px] shrink-0" name="material-symbols:auto-fix" size="20px"></Icon>
                                <!-- <Icon name="mdi:arrow-expand-vertical" size="20px"></Icon> -->
                            </span>
                        </div>
                        <div>Received {{autoScore || 0}} out of {{each.points}} points</div>
                        <div class="">Answer:</div>
                        <div v-html="each.student_text" class="box-border border-dotted border-2 border-sky-400 p-2 rounded font-medium !max-h-80 overflow-auto"></div>
                        <div>Teacher Feedback:</div>
                        <textarea :value="autoFeedback || each.teacher_text.replace(/<\/?[^>]+(>|$)/g, '')" class="grow p-2 border border-slate-700 rounded"></textarea>

                    </div>
                    <div v-else class="grow">Question Type Not Implemented Yet</div>
                    <div class=" flex justify-center gap-8 mt-2">
                        <Button @click="activeResponse--" class="!bg-sky-400 !border-sky-400">Back</Button>
                        <Button @click="activeResponse++" class="!bg-sky-400 !border-sky-400">Next </Button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const selectedStudent = ref(1)

const respondedStudents = ref([
    {
        label: route.params.respname,
        value: 1
    }
])

const autoFeedback: Ref<null | string> = ref(' ')
const autoScore: Ref<null | number> = ref(null)

const activeResponse = ref(1)

const score = computed(() => {
    if(pending) return null
    const percentscore = (data.score / data.max_score) * 10
    return Math.round(percentscore)
})

const { pending, data} = await useLazyFetch(`/api3/assignments/${route.params.id}/scans/${route.params.respid}/questions?create=true`, {

})

const isGrading = ref(false)

async function autoGrade(question: string, answer: string, max: number) {
        isGrading.value = true;
        const prompt = `Grade and provide feedback for the following answer to the question with a focus on grammar and spelling, then secondary is general writing tips and style. Please return your answer in valid JSON Object format in this structure. {score: number between and including 1-${max}, feedback: string}\n\nQuestion:"${question}"\n\nAnswer: ${answer}\n\n`;
        const data = await $fetch('https://api.openai.com/v1/chat/completions', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer API HERE`,
            },
            method: 'POST',
            body: {
                model: 'gpt-3.5-turbo',
                messages: [{'role':'user', 'content': prompt}],
            },
        });
        console.log('grade data', data);
        const completion = data.choices[0].message.content;
        const completionToJsonObj: {score: number, feedback: string} = JSON.parse(completion);
        console.log('completion', completionToJsonObj);
        autoScore.value = completionToJsonObj.score;
        autoFeedback.value = completionToJsonObj.feedback;
        isGrading.value = false;
}

</script>

