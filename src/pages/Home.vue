<template>
    <Layout class="home">
        <template #top>
            <div v-if="api.last_error.value"
                 class="bg-red-600 text-white px-4 py-2">
                {{ api.last_error.value }}
            </div>
        </template>
        <div class="p-4">
            <div class="space-y-4 text-left text-gray-500 dark:text-gray-400">
                <div v-for="(idea, k) in ideas">
                    <h1 class="text-lg font-bold capitalize mb-2">{{ k }}</h1>
                    <div v-for="name in idea"
                        class="flex items-center space-x-3 rtl:space-x-reverse">
                        <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 12">
                            <path stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                        <span>{{ name }}</span>
                    </div>
                </div>
            </div>
        </div>
        <template #bottom>
            <Btn @click="load"
                 class="w-full py-5 rounded-none">
                Get dish plan
            </Btn>
        </template>
    </Layout>
</template>
<script setup lang="ts">
import Layout from '@/components/Layout.vue';
import Btn from '@/components/Btn.vue';
import api from '@/api';
import { ref } from 'vue';

const ideas = ref<Awaited<ReturnType<typeof api.getIdeas>>>();

async function load() {
    const res = await api.getIdeas();

    ideas.value = res;
}
</script>
