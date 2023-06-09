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

    const isAuthenticated = ref(false);
    const { data: timeoutResponse, refresh: checkAuthentication } = useFetch<{ hasActiveSession: boolean }>('/timeout', {
        method: 'GET',
        credentials: 'include',
    });
    watch(timeoutResponse, (val) => {
        isAuthenticated.value = val?.hasActiveSession || false;
    });
    async function checkAuthenticationAndRedirectIfNeeded() {
        await checkAuthentication();
        if (!isAuthenticated.value) {
            navigateTo('/');
        }
    }
    let sessionTimer: NodeJS.Timer;
    async function startSessionTimer() {
        await checkAuthenticationAndRedirectIfNeeded();
        sessionTimer = setInterval(() => {
            checkAuthenticationAndRedirectIfNeeded();
        }, 30000)
    }
    startSessionTimer();

    function logout() {
        isAuthenticated.value = false
        navigateTo('/')
    }
    async function login(email: string, password: string, student?: boolean) {
        if (student) {
            navigateTo('/student-portal')
            return
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
        });
        const data: any = await resp
        isAuthenticated.value = true
        startSessionTimer();
        userId.value = data._id || null
        navigateTo('/home')
    }

    return {
        isAuthenticated,
        logout,
        login,
    }
}, {
    persist: true,
})
