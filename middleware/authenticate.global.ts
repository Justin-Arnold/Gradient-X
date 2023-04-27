import { useSessionStore } from '~/stores/session'
import {storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware((to) => {
    if (process.server) {
        return;
    }
    const sessionStore = useSessionStore()
    const { isAuthenticated } = storeToRefs(sessionStore)

    // if (!isAuthenticated.value && to.name !== 'logintype' || to.name !== 'student-portal') {
    //     console.error('Not Authenticated')
    //     return navigateTo('/login')
    // }
})