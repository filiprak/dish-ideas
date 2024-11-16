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

</style>