<script setup>
import { ref } from 'vue'
import caretDown from '../assets/svg/caret-down.svg'
import caretUp from '../assets/svg/caret-up.svg'
import LanguageService from '@/services/language'

const languageService = new LanguageService()

const props = defineProps({
    onSelect: Function,
    languages: Array
})

const isActive = ref(false)

const toggleActivity = () => {
    isActive.value = !isActive.value
}

const handleDropdownClick = (lang) => {
    props.onSelect(lang)
    toggleActivity()
    languageService.getTranslations()
}
</script>

<template>
    <div class="dropdown">
        <button class="rounded-dropdown" :class="{ 'active-dropdown': isActive }" @click="toggleActivity()">
            <slot />
            <img v-if="!isActive" :src="caretDown" width="12" height="12"/>
            <img v-else :src="caretUp" width="12" height="12"/>
        </button>
        <Transition name="fade">
            <ul v-if="isActive" class="dropdown-options">
                <li v-for="lang in languages" :key="lang.id" @click="handleDropdownClick(lang)">{{ `${ lang.flag } ${ lang.name }` }}</li>
            </ul>
        </Transition>
    </div>
</template>

<style lang="scss" scoped>
.dropdown {
    position: relative;

    .rounded-dropdown {
        display: flex;
        align-items: center;
        padding: $spacing-xs $spacing-sm;
        color: $color-white;
        background-color: $color-gray-300;
        width: fit-content;
        border-radius: $radius-xl;
        border: none;
        margin-right: $spacing-sm;
        cursor: pointer;
        transition: transform 0.2s ease;

        &:hover {
            transform: scale(1.05);
        }
    }

    .active-dropdown {
        color: $color-black;
        background-color: $color-white;
    }

    .dropdown-options {
        position: absolute;
        right: $spacing-sm;
        margin-top: calc($spacing-xs + 2px);
        padding: $spacing-xs;
        width: max-content;
        background-color: $color-gray-500;
        font-size: $text-sm;
        border-radius: calc($radius-sm * 2);

        li {
            list-style: none;
            padding: $spacing-xs;
            border-radius: $radius-sm;

            &:hover {
                cursor: pointer;
                background-color: rgba($color: $color-white, $alpha: 0.1);
            }
        }
    }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>