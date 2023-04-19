import { defineStore, storeToRefs } from 'pinia'
import { useUserStore } from './user'


interface State {
    lastLoginType: 'teacher' | 'student' | null,
    isAuthenticated: boolean,
    userId: string | null,
}

const userStore = useUserStore();
const { userId } = storeToRefs(userStore);

export const useSessionStore = defineStore('session', {
    state: (): State => {
        return {
            lastLoginType: null,
            isAuthenticated: false,
            userId: null,
        }
    },
    actions: {
        logout() {
            this.lastLoginType = null
            this.isAuthenticated = false
            navigateTo('/')
        },
        async login(email: string, password: string, student?: boolean) {
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
            this.isAuthenticated = true
            userId.value = data._id || null
            navigateTo('/home')
        },
    },
    persist: true
})
