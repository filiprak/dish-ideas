<template>
    <Layout class="home">
        <div class="recipe">
            <Markdown :source="recipes[0]" />
        </div>
        <template #bottom>
            <Btn @click="load"
                 class="w-full py-5 rounded-none">Generate</Btn>
        </template>
    </Layout>
</template>
<script setup lang="ts">
import Layout from '@/components/Layout.vue';
import Btn from '@/components/Btn.vue';
import api from '@/api';
import { ref } from 'vue';
import Markdown from 'vue3-markdown-it';

const recipes = ref<string[]>([]);

async function load() {
    const recipe = await api.recipe();

    recipes.value = [recipe];
}
</script>
<style scoped>
.recipe {
    padding: 15px;
}
</style>