<template>
    <Layout class="home">
        <template #bottom>
            <Btn @click="load"
                 class="w-full py-5 rounded-full">Generate</Btn>
        </template>
    </Layout>
</template>
<script setup lang="ts">
import Layout from '@/components/Layout.vue';
import Btn from '@/components/Btn.vue';

async function load() {
    return new Promise(r => setTimeout(r, 2000));
}
</script>
