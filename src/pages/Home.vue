<template>
    <Layout class="home">
        <template #top>
            <div v-if="api.last_error.value"
                 class="bg-red-600 text-white px-4 py-2">
                {{ api.last_error.value }}
            </div>
        </template>
        <div class="p-4">
            <!-- <Md :source="recipes[0]" /> -->

            {{ ideas }}
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

const ideas = ref<string[]>([]);

async function load() {
    const res = await api.getIdeas();

    ideas.value = res?.ideas || [];
}
</script>
