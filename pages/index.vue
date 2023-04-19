<script setup lang="ts">
import { useSessionStore } from '~~/stores/session'
import { storeToRefs } from 'pinia';

const sessionStore = useSessionStore()
const { isAuthenticated } = storeToRefs(sessionStore)

onBeforeMount(() => {
    if (isAuthenticated.value) {
        navigateTo('/home')
    } else {
        navigateTo('/login')
    }
})

</script>