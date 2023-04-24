<template>
    <div class="flex overflow-hidden h-full">
        <div class="shrink-0">
            <label class="text-slate-600 -mb-4">Student</label><br/>
            <PrimeDropdown v-model="selectedStudent" :options="responses" optionLabel="student" optionValue="key" class="w-60 mb-8"></PrimeDropdown>
            <div class="w-60 flex justify-between -mb-6 text-slate-600" >
                <div>Score: {{ !data ? '?' : data.score }}/{{ !data ? '?' : data.max_score }}</div>
            </div><br/>
            <PrimeProgressBar :value="data ? Math.round((data.score / data.max_score) * 100) : 0" class="w-60"></PrimeProgressBar>
        </div>

        <div class="grow px-4 flex flex-col gap-2 overflow-auto h-full">
            <div class="grow overflow-y-auto overflow-x-hidden h-full p-2">
                <div v-for="each, index in data ? data.questions : []" class="bg-slate-50 text-slate-800 p-2 flex flex-col h-full shadow-md shadow-neutral-400 shrink-0 rounded-lg" :class="index === activeResponse ? 'block' : 'hidden'">
                    <!-- ! Rubric Response View -->
                    <div v-if="each.type === 'rubric'" class="grow flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center">
                            <div class="flex gap-2 items-center">
                                <p>{{ each.label }}.</p>
                                <p class="text-xs rounded text-slate-500">Write A short 4 paragraph mini-essay on the native habitat of the narwhal (Open Response)</p>
                            </div>
                            <div class="flex gap-2 items-center">
                                <div class="flex items-center whitespace-nowrap text-lg font-bold gap-1"><PrimeInputText :value="autoScore || each.value" class="h-8 !m-0 w-10"/><span class="text-slate-800">/{{each.points}} pts</span></div>
                                <span class="px-3 rounded-full" :class="each.value > 0 ? 'bg-emerald-400 text-emerald-900' : 'text-red-900 bg-red-400'">{{ !!each.value ? 'Graded' : 'Not Graded' }}</span>
                                <span class="flex justify-center items-center gap-2 bg-sky-400 h-8 w-32 rounded text-white cursor-pointer overflow-hidden">
                                    <p class="grow text-center" @click="autoGrade('Write A short 4 paragraph mini-essay on the native habitat of the narwhal', each.student_text.replace(/<\/?[^>]+(>|$)/g, ''), each.points)">
                                        {{ isGrading ? '...' : 'Auto Grade'}}
                                    </p>
                                    <Icon class="w-[28px] shrink-0" name="material-symbols:auto-fix" size="20px"></Icon>
                                    <!-- <Icon name="mdi:arrow-expand-vertical" size="20px"></Icon> -->
                                </span>
                            </div>
                        </div>
                        <div class="">Answer:</div>
                        <div v-html="each.student_text" class="box-border border-dotted border-2 border-sky-400 p-2 rounded font-medium !max-h-80 overflow-auto"></div>
                        <div>Teacher Feedback:</div>
                        <textarea :value="autoFeedback || each.teacher_text.replace(/<\/?[^>]+(>|$)/g, '')" class="grow p-2 border border-slate-700 rounded"></textarea>
                    </div>
                    <!-- ! Fill In the Blank Response View -->
                    <div v-else-if="each.type === 'fitb'" class="grow flex flex-col overflow-hidden">
                        <div class="flex justify-between items-center">
                            <div class="flex gap-2 items-center">
                                <p>{{ each.label }}.</p>
                                <p class="text-xs rounded text-slate-500">(Fill in the Blank)</p>
                            </div>
                            <span class="flex gap-2">
                                <div class="flex items-center whitespace-nowrap text-lg font-bold gap-1"><PrimeInputText :value="each.correct.includes(each.value) ? each.points : 0" class="h-8 !m-0 w-10"/><span class="text-slate-800">/{{each.points}} pts</span></div>
                                <span class="px-3 rounded-full grid place-items-center" :class="!!each.value ? 'bg-emerald-400 text-emerald-900' : 'text-red-900 bg-red-400'">{{ !!each.value ? 'Graded' : 'Not Graded' }}</span>
                            </span>
                        </div>
                        <div class="">Correct Answer{{ each.correct.length > 1 ? 's' : '' }}:</div>
                        <div class="flex gap-2">
                            <span v-for="correct, index in each.correct" :key="index" class="bg-slate-300 py-1 px-3 text-center rounded">
                                {{ correct }}
                            </span>
                        </div>
                        <div class="">Submitted Answer:</div>
                        <span class=" py-1 px-3 text-center rounded w-fit" :class="each.correct.includes(each.value) ? 'bg-emerald-400  text-emerald-800' : 'bg-red-400 text-red-900'">{{each.value}}</span>
                        <div>Teacher Feedback:</div>
                        <textarea :value="each.teacher_text.replace(/<\/?[^>]+(>|$)/g, '')" class="grow p-2 border border-slate-700 rounded"></textarea>

                    </div>
                     <!-- ! Multiple Choice Response View -->
                     <div v-else-if="each.type === 'mc'" class="grow flex flex-col overflow-hidden text-slate-600">
                        <div class="flex justify-between items-center">
                            <div class="flex gap-2 items-center">
                                <p>{{ each.label }}.</p>
                                <p class="text-xs rounded text-slate-500">(Multiple Choice)</p>
                            </div>
                            <span class="flex gap-2">
                                <div class="flex items-center whitespace-nowrap text-lg font-bold gap-1"><PrimeInputText :value="each.correct.includes(JSON.stringify(index+1)) ? each.points : 0" class="h-8 !m-0 w-10"/><span class="text-slate-800">/{{each.points}} pts</span></div>
                                <span class="px-3 rounded-full grid place-items-center" :class="!!each.value ? 'bg-emerald-400 text-emerald-900' : 'text-red-900 bg-red-400'">{{ !!each.value ? 'Graded' : 'Not Graded' }}</span>
                            </span>
                        </div>
                        <div class="">Correct Answer{{ each.correct.length > 1 ? 's' : '' }}:</div>
                        <div class="flex gap-2 mb-2">
                            <span v-for="letter, index in each.choices" :key="index" class="border border-sky-400 px-2 aspect-square grid place-items-center rounded-full" :class="{'bg-sky-400 text-white':each.correct[0].split('').includes(JSON.stringify(index))}">
                                {{ letter }}
                            </span>
                        </div>
                        <div class="">Submitted Answer:</div>
                        <div class="flex gap-2 mb-4">
                            <span v-for="letter, index in each.choices" :key="index" class="border border-sky-400 px-2 aspect-square grid place-items-center rounded-full" :class="getColorClass(index, each)">
                                {{ letter }}
                            </span>
                        </div>
                        <div>Teacher Feedback:</div>
                        <textarea :value="each.teacher_text.replace(/<\/?[^>]+(>|$)/g, '')" class="grow p-2 border border-slate-700 rounded"></textarea>

                    </div>
                    <!-- ! Catch All View -->
                    <div v-else class="grow">Question Type Not Implemented Yet {{ each }}</div>
                    <div class=" flex justify-center gap-8 mt-2">
                        <PrimePaginator v-model:first="activeResponse" :totalRecords="data ? data.questions.length : 0" :rows="1" class="!bg-transparent"></PrimePaginator>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const selectedStudent = ref(route.params.respid)


const autoFeedback: Ref<null | string> = ref('')
const autoScore: Ref<null | number> = ref(null)

const activeResponse = ref(0)

function getColorClass(index: number, each: any): string {
    const chosen: string[] = each.value.split('')
    const correct: string[] = each.correct[0].split('')
    if(chosen.includes(JSON.stringify(index))) {
        if(correct.includes(JSON.stringify(index))) {
            return 'bg-emerald-400 text-emerald-900'
        } else {
            return 'bg-red-400 text-red-900'
        }
    }
    return ''
}


const { pending, data} = useFetch(`/api3/assignments/${route.params.id}/scans/${route.params.respid}/questions?create=true`, {

})
const responses = inject('responses')

watch(selectedStudent, async (newVal) => {
    const newStudent = responses.value.find((each: any) => each.key === newVal)
    const basePath = route.fullPath.split('/').slice(0, -1).join('/')
    navigateTo(`${basePath}/${newStudent.student}-${newStudent.key}`)
})

const isGrading = ref(false)

async function autoGrade(question: string, answer: string, max: number) {
        isGrading.value = true;
        const prompt = `Grade and provide feedback for the following answer to the question with a focus on grammar and spelling, then secondary is general writing tips and style. Please return your answer in valid JSON Object format in this structure. {score: number between and including 1-${max}, feedback: string}\n\nQuestion:"${question}"\n\nAnswer: ${answer}\n\n`;
        const data = await $fetch('https://api.openai.com/v1/chat/completions', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer SK KEY`,
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

<style scoped>
:deep(.p-paginator) {
    background-color: transparent !important;
}
</style>