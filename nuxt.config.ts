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
    nitro: {
        devProxy: {
            "/api3": {
                target:"http://localhost:3000/api3",
                changeOrigin: true,
                prependPath: true,
            },
            "/api": {
                target:"http://localhost:3000/api",
                changeOrigin: true,
                prependPath: true,
            }
        }
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
