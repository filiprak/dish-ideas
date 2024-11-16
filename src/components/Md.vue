<template>
    <Markdown class="md"
              :source="source || ''" />
</template>
<script setup lang="ts">
import Markdown from 'vue3-markdown-it';

defineProps<{
    source?: string,
}>();
</script>
<style>
.md ul,
.md ol {
    list-style: disc;
    padding: 10px;
    margin: 10px;
}
</style>