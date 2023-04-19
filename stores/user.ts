import { defineStore, storeToRefs } from 'pinia'


export const useUserStore = defineStore('user', () => {
    const userId = ref('');

    const teacherProfile = ref<any>({});

    async function updateTeacherProfile() {
        const { data } = await useFetch('/api3/user/profile', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        });
    }

    return {
        userId,
        teacherProfile,
        updateTeacherProfile,
    }
})
