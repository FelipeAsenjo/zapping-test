<script setup>
    const props = defineProps({
        icon: String,
        url: String
    })

    console.log('url', props.url)
</script>

<template>
<button v-if="props.icon" class="squared-button">{{ props.icon }}</button>
<button v-if="props.url" class="squared-button">
    <img :src="props.url" />
</button>
</template>

<style lang="scss" scoped>
.squared-button {
    display: flex;
    align-items: center; 
    height: 24px;
    margin-right: $spacing-3xs;
    padding: $spacing-2xs calc(2*$spacing-2xs);
    color: $color-white;
    background-color: rgba($color: $color-white, $alpha: $opacity-xxs);
    border: 1px solid;
    border-radius: $radius-sm;
    border-color: rgba($color: $color-white, $alpha: $opacity-xs);
}
</style>