import { defineStore, storeToRefs } from 'pinia'
import { useUserStore } from './user'


interface State {
    lastLoginType: 'teacher' | 'student' | null,
    isAuthenticated: boolean,
    userId: string | null,
}



export const useSessionStore = defineStore('session', () => {

    const userStore = useUserStore();
    const { userId } = storeToRefs(userStore);

    const isAuthenticated = ref(false)

    function logout() {
        isAuthenticated.value = false
        navigateTo('/')
    }
    async function login(email: string, password: string, student?: boolean) {
        if (student) {
            navigateTo('/student-portal')
        }
        const resp = await useFetch('/api3/login', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                username: email,
                password: password,
                generateToken: false,
                redirect: null,
                extAuth: false,
            }),
            params: {
                gcToken: '',
            }
        });
        const data: any = await resp
        isAuthenticated.value = true
        userId.value = data._id || null
        navigateTo('/home')
    }

    return {
        isAuthenticated,
        logout,
        login,
    }
})
