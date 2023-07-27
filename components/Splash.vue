<script setup lang="ts">
import { SplashEmitLenis, SPLASH_DELAY, SplashStatus } from '@/types/Splash';

const splashEl = ref<HTMLDivElement | null>(null)
const timeout01 = ref<ReturnType<typeof setTimeout> | null>(null)
const emit = defineEmits<{
    setLenis: [state: SplashEmitLenis]
    setStatus: [state: SplashStatus]
}>()

function _splashOut() {
    emit('setStatus', SplashStatus.animateOut)
    return () => splashEl.value?.classList.replace('splash-in', 'splash-out')
}

onMounted(() => {
    emit('setStatus', SplashStatus.animateIn)
    splashEl.value?.addEventListener('animationend', (e) => {
        if (e.animationName.includes('intro')) {
            emit('setStatus', SplashStatus.delay)
            timeout01.value = setTimeout(_splashOut(), SPLASH_DELAY)
        } else if (e.animationName.includes('outro')) {
            emit('setStatus', SplashStatus.standby)
            splashEl.value?.classList.replace('splash-out', 'splash-standby')
            emit('setLenis', SplashEmitLenis.start)
        }
    })
})
onUnmounted(() => {
    emit('setStatus', SplashStatus.canceled)
    clearTimeout(timeout01.value || 0)
})
</script>

<template>
    <div class="splash splash-in" ref="splashEl">
        <img src="/svgs/yusr.svg" alt="yusrmuttaqien-logo">
    </div>
</template>

<style scoped lang="scss">
.splash {
    display: grid;
    place-items: center;
    position: fixed;
    inset: 0;
    background-color: var.$black;
    perspective: 200px;

    img {
        height: 3.75rem;
        transition: transform .3s ease-in-out;

        @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
            height: 5.375rem;
        }
    }

    &-in img {
        animation: forwards intro 1.5s ease-in-out;
    }

    &-out img {
        animation: forwards outro .5s ease-in-out;
    }

    &-standby {
        display: none;
    }

    @keyframes intro {
        0% {
            transform: translateZ(calc(500px + 20rem));
        }

        100% {
            transform: translateZ(0);
        }
    }

    @keyframes outro {
        0% {
            transform: translateZ(0);
        }

        80% {

            opacity: 0;
        }

        100% {
            transform: rotateX(25deg) translateZ(-1.5rem);
            opacity: 0;
        }
    }
}
</style>