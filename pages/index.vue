<script setup lang="ts">
import { useSessionStore } from '~~/stores/session'
import { storeToRefs } from 'pinia';

const sessionStore = useSessionStore()
const { lastLoginType, isAuthenticated } = storeToRefs(sessionStore)

onBeforeMount(() => {
    if (isAuthenticated.value) {
        navigateTo('/home')
    } else if (lastLoginType.value === 'student') {
        navigateTo('/loginStudent')
    } else {
        navigateTo('/login')
    }
})

</script>