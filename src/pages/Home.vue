<template>
    <Layout class="home text-gray-400">
        <template #top>
            <div v-if="api.last_error.value"
                 class="bg-red-600 text-white px-4 py-2">
                {{ api.last_error.value }}
            </div>
        </template>
        <div class="p-4">
            <div v-if="!ideas" class="flex justify-center align-middle p-5">Loading...</div>
            <div class="space-y-4 text-left">
                <div v-for="(idea, k) in ideas">
                    <h1 class="text-lg font-bold capitalize mb-2">{{ k }}</h1>
                    <div v-for="{ name, short_description } in [idea]"
                         class="border-2 p-3 border-teal-700 rounded-xl">
                        <div class="font-bold text-teal-400">{{ name }}</div>
                        <div>{{ short_description }}</div>
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
import { onMounted, ref } from 'vue';

const ideas = ref<Awaited<ReturnType<typeof api.getIdeas>>>();

async function load() {
    const res = await api.getIdeas();

    ideas.value = res;
}

onMounted(() => {
    load();
});
</script>
