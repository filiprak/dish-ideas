<template>
    <Layout class="home">
        <div>
            {{ recipes[0] }}
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

const recipes = ref<string[]>([]);

async function load() {
    const recipe = await api.recipe();

    recipes.value = [recipe];
}
</script>
