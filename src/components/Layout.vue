<template>
    <div class="layout">
        <div class="layout__top">
            <slot name="top"></slot>
        </div>
        <div class="layout__content">
            <slot></slot>
        </div>
        <div class="layout__bottom">
            <slot name="bottom"></slot>
        </div>
    </div>
</template>
<style scoped>
.layout {
    display: grid;
    grid-template-rows: auto 1fr auto;
    width: 100%;
    height: 100%;
}
</style>
