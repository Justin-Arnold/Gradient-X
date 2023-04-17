import { defineStore } from 'pinia'


interface State {
    lastLoginType: 'teacher' | 'student' | null,
    isAuthenticated: boolean,
    userId: string | null,
}

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
        async login(email: string, password: string) {
            const resp = $fetch('http://localhost:3000/api3/login', {
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
            this.isAuthenticated = true
            this.userId = data._id || null
            navigateTo('/home')
        },
    },
    persist: true
})
