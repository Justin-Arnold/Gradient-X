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
        async login() {
            const searchParams = new URLSearchParams(location.search);
            const resp = $fetch('http://localhost:3000/api3/login', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    username: 'admin@school.com',
                    password: 'password',
                    generateToken: false,
                    redirect: null,
                    extAuth: false,
                }),
            });
            console.log('resp', resp)
            const data: any = await resp
            console.log('data', data)
            this.isAuthenticated = true
            this.userId = data._id || null
        },
    },
    persist: true
})
