<script setup>

</script>

<template>
    <button class="rounded-button">
        <slot />
    </button>
</template>

<style lang="scss" scoped>
.rounded-button {
    background-color: $color-gray-300;
    width: 52px;
    height: 52px;
    border-radius: $radius-round;
    border: none;
    margin-right: $spacing-sm;
    cursor: pointer;
    transition: transform 0.2s ease;


    &:hover {
        transform: scale(1.05);
    }
}
</style>