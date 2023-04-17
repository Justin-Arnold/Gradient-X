<script setup lang="ts">
import { useSessionStore } from '~/stores/session';

definePageMeta({
    validate: async (route) => {
        const type = route.params.type
        return type === 'Student' || !type
    }
})

const router = useRouter()
const sessionStore = useSessionStore()
const { login } = sessionStore

const teacherEmail = ref('')
const teacherPassword = ref('')

function changeLoginType() {
    if (isStudent.value) {
        router.push('/login')
    } else {
        router.push('/loginStudent')
    }
}

const isStudent = computed(() => {
    const route = useRoute()
    return route.params.type === 'Student'
})
</script>

<template>
    <div class="h-screen w-screen absolute top-0 left-0">
        <nuxt-img src="https://app.gradecam.dev/i3/dist/fe920bbcaca19daac2ae.jpg" class="h-full w-full blur-xl"></nuxt-img>
    </div>
    <div class="h-screen w-screen absolute top-0 left-0 grid place-items-center">
        <div class="bg-slate-50 shadow-black/20 shadow-lg rounded-lg px-32 py-16">
            <div class="flex justify-between mb-10 items-center">
                <div class="flex items-center gap-1 text-lg">
                    <nuxt-img src="logo.png" class="aspect-square h-16"/>
                    <h1 class="font-bold text-xl text-slate-800">
                        Gradient
                    </h1>
                </div>
                <Button @click="changeLoginType" size="small" class="h-1/2" outlined>
                    Not a {{isStudent ? 'student' : 'teacher'}}? Click here.
                </Button>
            </div>
            <div class="flex flex-col gap-1 mb-10">
                <h2  class="text-3xl font-bold text-slate-800">
                    Log in to your {{isStudent ? 'student' : 'teacher'}} account.
                </h2>
                <p class="text-neutral-600 text-">Don't have a teacher account? <NuxtLink class="text-blue-600">Sign Up.</NuxtLink></p>
            </div>
            <div v-if="!isStudent" class="w-full mb-10">
                <div class="flex flex-col gap-6">
                    <TextInput label="Email" v-model="teacherEmail"></TextInput>
                    <TextInput label="Password" v-model="teacherPassword" type="password"></TextInput>
                </div>
                <div class="flex justify-between w-full mt-2">
                    <div class="flex text-slate-700">
                        <input type="checkbox" class="mr-2"/>Save Password
                    </div>
                    <div class="text-blue-600 dark:text-blue-400 cursor-pointer">
                        Forgot Password?
                    </div>
                </div>
            </div>
            <div v-else class="w-full mb-10">
                <div class="flex flex-col gap-6">
                    <div class="flex gap-2 w-full">
                        <TextInput label="First Name"></TextInput>
                        <TextInput label="Last Name"></TextInput>
                    </div>
                    <TextInput label="Access Code" type="password"></TextInput>
                </div>
                <div class="flex justify-between w-full mt-2">
                    <div class="flex text-slate-700">
                        <input type="checkbox" class="mr-2"/>Save Access Code
                    </div>
                </div>
            </div>
            <Button @click="login(teacherEmail, teacherPassword)" class="w-full justify-center !text-lg">
                Log in as a {{isStudent ? 'student' : 'teacher'}}
            </Button>
            <div class="w-full my-6 flex items-center">
                <div class="w-1/2 h-0.5 bg-slate-400"></div>
                <div class="mx-4 whitespace-nowrap text-slate-500">or connect using</div>
                <div class="w-1/2 h-0.5 bg-slate-400"></div>
            </div>
            <div class="w-full flex items-center justify-center gap-8">
                <Button @click="" class="w-40" outlined>
                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8 bg-white rounded p-1"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.64 9.20456C17.64 8.56637 17.5827 7.95274 17.4764 7.36365H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8196H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20456Z" fill="#4285F4"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z" fill="#34A853"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.96409 10.7099C3.78409 10.1699 3.68182 9.59313 3.68182 8.99995C3.68182 8.40677 3.78409 7.82995 3.96409 7.28995V4.95813H0.957273C0.347727 6.17313 0 7.54768 0 8.99995C0 10.4522 0.347727 11.8268 0.957273 13.0418L3.96409 10.7099Z" fill="#FBBC05"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"></path></svg>
                    <p class="grow">Google</p>
                </Button>
                <Button class="w-40" outlined>
                    <svg viewBox="0 0 39 39" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="h-8 bg-white rounded p-1"><g id="Clever-C" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M19.3982461,38.9648361 C14.2199306,39.0479079 9.22992725,37.0327595 5.57289395,33.381646 C1.91586065,29.7305325 -0.094342567,24.756806 0.00340526929,19.6013907 L0.00340526929,19.4945087 C-0.0908074366,14.2806957 1.95662835,9.25451146 5.67194999,5.57898083 C9.38727163,1.9034502 14.4485056,-0.102901632 19.6845168,0.0241814366 C25.2635774,-0.25285566 30.6949311,1.86090489 34.6063778,5.83143368 L29.2388019,11.9058908 C26.7276536,9.31129637 23.3013377,7.79089146 19.6845168,7.66624037 C13.3149934,7.66624037 8.71677011,13.0103375 8.71677011,19.3876268 L8.71677011,19.4945087 C8.71677011,25.9430526 13.2076419,31.3227771 19.6845168,31.3227771 C23.4702447,31.2948741 27.0738621,29.7009891 29.6324241,26.9228038 L35,32.2669009 C31.1386539,36.7573839 25.4197058,39.2332922 19.4877057,38.9826497" fill="#4374F6" fill-rule="nonzero"></path></g></svg>
                    <p class="grow">Clever</p>
                </Button>
                <Button class="w-40" outlined>
                    <svg viewBox="0 0 210 150" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8 py-2 bg-white rounded p-1"><path d="M61.2 88.652C53 97.952 61.1 102.352 61.1 102.352C61.4 102.552 61.7 102.652 62 102.752C60.8 97.752 60.7 93.052 61.2 88.652Z" fill="#0A4D7F"></path><path d="M114.3 100.652C107.9 104.952 100.5 119.452 100.5 119.452H96.6C99.1 113.952 100.7 109.352 101.7 105.652C100.7 105.952 100.2 106.152 100.2 106.152C92.5 108.752 84.7 110.152 77.8 110.252C85.1 121.052 98.3 123.052 98.3 123.052C116.9 125.552 131.1 115.352 138.7 107.952C123 99.252 114.3 100.652 114.3 100.652Z" fill="#0A4D7F"></path><path d="M174.6 60.552C174.6 60.552 186.9 30.052 158.8 9.15201C158.8 9.15201 113.8 -20.448 88.7 28.952C88.7 28.952 70.7 10.952 48.5 24.952C29.5 36.852 32.7 52.952 34.4 61.052C34.4 61.052 -1.39998 71.552 0.400022 109.752C1.80002 138.152 29.2 146.752 39.9 148.952C42.2 149.452 44.6 149.652 47 149.652H164.6C166.9 149.652 169.2 149.452 171.5 148.952C182.3 146.752 210 138.252 209.5 108.052C208.8 70.752 174.6 60.552 174.6 60.552ZM97.4 129.052C73.6 128.752 65.1 110.952 65.1 110.952C64.6 109.952 64.2 109.052 63.8 108.152C57.3 105.752 53.4 101.152 54.3 94.252C55.2 87.352 63 80.552 63 80.552C67.5 66.552 77.7 56.952 77.7 56.952C77.7 56.952 86.2 47.852 95.6 43.152L111.8 45.652C75.1 60.652 73.2 91.552 73.2 91.552C73 96.252 73.5 100.152 74.6 103.552C77.3 103.352 79.3 103.052 79.3 103.052C88.4 101.652 96.2 99.252 102.8 96.352C102.6 90.252 99.8 88.752 99.8 88.752C99.8 88.752 96.5 84.952 82.8 82.752L84.1 80.952C84.1 80.952 90.9 82.452 98.5 80.952C106.8 79.352 114.5 73.652 123 61.952L127.1 61.752C118.8 72.752 118.2 81.152 119.6 86.652C127.9 80.452 131.8 75.052 131.8 75.052C146.8 54.152 126 57.352 126 57.352L132.2 49.952C164 56.852 134.8 85.552 134.8 85.552C131.4 89.052 127.7 92.052 123.9 94.552C124.4 95.152 129.9 100.752 140.5 105.852C143.3 102.852 144.7 100.752 144.7 100.752L148.9 101.552C124.3 131.252 97.4 129.052 97.4 129.052ZM108.7 69.452C108.6 72.952 105.7 75.752 102.2 75.852C98.3 75.952 95.2 72.752 95.4 68.852C95.5 65.352 98.4 62.552 101.9 62.452C105.7 62.352 108.9 65.552 108.7 69.452Z" fill="#0A4D7F"></path></svg>
                    <p class="grow">ClassLink</p>
                </Button>
            </div>
        </div>
    </div>
</template>
