<script setup lang="ts">
import ICYusrilMuttaqien from '@/components/icons/ICYusrilMuttaqien.vue'
import cssVar from '@/styles/_export.module.scss';
</script>

<template>
    <div class="splash splash-loading">
        <span>
            <ICYusrilMuttaqien class="icon" :color-base="cssVar.blueBase" :color-accent="cssVar.blueLight" />
        </span>
    </div>
</template>

<style scoped lang="scss">
.splash {
    background-color: var.$blue-base;
    height: 100svh;
    position: fixed;
    inset: 0;
    display: grid;
    place-items: center;
    min-height: max-content;
    overflow: auto;

    &-loading {
        animation: flash 5s ease-in-out forwards infinite alternate;
    }

    span {
        perspective: 1000px;
        overflow-y: visible;
        overflow-x: hidden;

        .icon {
            font-size: 7.1875rem;
            transform-origin: bottom left;
            animation: reveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            transition: opacity 0.3s ease-in-out;

            @keyframes reveal {
                0% {
                    opacity: 0;
                    transform: rotateX(56deg) rotateY(24deg) rotateZ(10deg) translateY(7rem);
                }

                80% {
                    opacity: 1;
                }

                100% {
                    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translate3d(0px, 0rem, 0px);
                }
            }
        }
    }

    @keyframes flash {
        0% {
            background-color: var.$blue-base;
        }

        100% {
            background-color: var.$blue-light;
        }
    }
}
</style>