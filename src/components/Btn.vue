<template>
    <button :class="classes"
            type="button"
            :disabled="loading"
            @click="_onClick">
        <template v-if="loading">
            <svg class="animate-spin h-6 w-6 text-white"
                 xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 24 24">
                <circle class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"></circle>
                <path class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
        </template>
        <template v-else>
            <slot></slot>
        </template>
    </button>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
    onClick?: Function,
}>();

const loading = ref(false);
const classes = computed(() => ({
    'btn': true,
    'inline-flex items-center justify-center py-2 px-4': true,
    'bg-teal-500 hover:bg-teal-600 text-white font-bold': true,
    'rounded': true,
    'pointer-events-none': loading.value,
    'opacity-75': loading.value,
}));

function _onClick() {
    if (props.onClick) {
        const val = props.onClick();

        if (val instanceof Promise) {
            loading.value = true;
            val.finally(() => {
                loading.value = false;
            })
        }
    }
}
</script>