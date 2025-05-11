<script setup>
    const props = defineProps(['label'])
</script>

<template>
    <div class="button-group">
        <slot />
        <p>{{ props.label }}</p>
    </div>
</template>

<style lang="scss" scoped>
.button-group {
    margin-right: $spacing-md;
    display: flex;
    align-items: center;

    p {
        color: $color-gray-50;
        font-size: $text-sm;
    }
}
</style>