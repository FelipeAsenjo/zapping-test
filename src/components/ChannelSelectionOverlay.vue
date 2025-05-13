<script setup>
import { usePlayerStatusStore } from '@/stores/player'
import { useVisibilityStore } from '@/stores/visibility'

const { visibilityStatus, hideChannelsMenu } = useVisibilityStore()
const { playerStatus, setChannel } = usePlayerStatusStore()

const handleSelectChannel = (newChannel) => {
    setChannel(newChannel)
    hideChannelsMenu()
}

</script>

<template>
    <section class="channels-control">
        <ul class="channels-list">
            <li v-for="channel in playerStatus.availableChannels" @click="handleSelectChannel(channel)">
                <span>{{ channel.number }}</span>
                <img :src="channel.logo_color" alt="Channel Icon">
                <span>{{ channel.name }}</span>
            </li>
        </ul>
    </section>
</template>

<style lang="scss" scoped>
.channels-control {
    padding: $spacing-xl;

   .channels-list {
        list-style: none;
        width: fit-content;
        min-width: 270px;
        max-height: 90vh;
        overflow-y: auto;
        scrollbar-color: rgba($color-white, $opacity-xxs) transparent;
        scrollbar-width: thin;

        li {
            display: flex;
            align-items: center;
            margin-bottom: calc($spacing-xs + 2px);
            padding: $spacing-md $spacing-lg;
            background-color: rgba($color: $color-white, $alpha: $opacity-xxs);
            opacity: $opacity-md;
            border-radius: $radius-md;

            &:hover {
                cursor: pointer;
                background-color: rgba($color-white, $opacity-xs);
                border: 2px solid $color-white;
                opacity: $opacity-lg;
            }

            img {
                padding: 0 calc($spacing-sm - 2px);
            }
        }
   }
}
</style>