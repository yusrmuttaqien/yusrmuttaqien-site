<script setup lang="ts">
const { error } = defineProps({
    error: Object
})

useHead({
    title: error?.statusCode + ' | YUSRIL MUTTAQIEN',
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ]
})

const _handleClear = () => clearError({ redirect: '/' })
const message = error?.message.substring(0, error?.message.indexOf(':') + 1).replace(':', '') || ''
</script>

<template>
    <main>
        <div class="info">
        </div>
    </main>
</template>

<style scoped lang="scss">
main {}
</style>