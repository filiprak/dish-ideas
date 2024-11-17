<template>
    <Layout class="home">
        <div class="recipe">
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
<style scoped>
.recipe {
    padding: 15px;
}
</style>