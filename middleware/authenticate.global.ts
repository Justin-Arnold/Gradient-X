import { useSessionStore } from '~/stores/session'
import {storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware((to) => {
    const sessionStore = useSessionStore()
    const { isAuthenticated } = storeToRefs(sessionStore)

    console.log('1', to.name)
    if (to.path === '/home' && !isAuthenticated.value) {
        console.error('Not Authenticated')
        return navigateTo('/login')
    }
})