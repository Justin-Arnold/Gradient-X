// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@nuxt/image-edge',
        'nuxt-icon',
        '@pinia-plugin-persistedstate/nuxt',
        '@bg-dev/nuxt-naiveui',
        '@vueuse/nuxt'
    ],
    devServer: {
        port: 8000
    },
    piniaPersistedstate: {
        storage: 'localStorage'
    },
    css: [
        "primevue/resources/themes/lara-light-blue/theme.css",
        "primevue/resources/primevue.css",
        "primeicons/primeicons.css"
    ],
    build: {
        transpile: ["primevue"]
    }
})
