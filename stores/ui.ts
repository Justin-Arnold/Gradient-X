import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'


interface UiState {
    isDrawerOpen: Ref<boolean>
}

interface State {
    assignments: UiState,
    navDirection: 'up' | 'down'
}

export const useUiStore = defineStore('ui', {
    state: (): State => {
        return {
            assignments: {
                isDrawerOpen: useStorage('assignments.isDrawerOpen', false),
            },
            navDirection: 'up',
        }
    },
    persist: true
})
