import { defineStore } from 'pinia'


interface State {
    userId: string | null,
}

export const useUserStore = defineStore('user', {
    state: (): State => {
        return {
            userId: null,
        }
    },   
    persist: true
})
