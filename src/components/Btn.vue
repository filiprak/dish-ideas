<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>
<style scoped>
.btn {
    display: inline-grid;
    outline: none;
    border: none;
    padding: 8px 10px;
    margin: 0;
}
</style>
