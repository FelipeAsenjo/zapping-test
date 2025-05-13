<script setup>
import { computed, ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router';

import RoundedButton from '@/components/RoundedButton.vue'
import SquaredButtonGroup from '@/components/SquaredButtonGroup.vue'
import SquaredButton from '@/components/SquaredButton.vue'
import Dropdown from '@/components/Dropdown.vue'

import arrowUp from '../assets/svg/arrow-up.svg'
import arrowDown from '../assets/svg/arrow-down.svg'
import arrowLeft from '../assets/svg/arrow-left.svg'
import arrowRight from '../assets/svg/arrow-right.svg'
import zappingLogo from '../assets/svg/zapping_logo.svg'

import { usePlayerStatusStore } from '@/stores/player'
import { useLanguageStore } from '@/stores/language'
import { useVisibilityStore } from '@/stores/visibility'

const router = useRouter();
const iconSize = 20
const volumeBar = ref(null)
let isDragging = false
const { playerStatus, setVolume } = usePlayerStatusStore()
const { languageStatus, setSelectedLanguage } = useLanguageStore()
const { 
  visibilityStatus, 
  toggleVolumeBarVisibility, 
  hideVideoControls,
  showChannelsMenu,
} = useVisibilityStore()

const handleTopMenuClick = () => {
  hideVideoControls()
  showChannelsMenu()
}

const handlePlayClick = () => {
  console.log('handlePlayClick')
}

const handleVolumeClick = () => {
  toggleVolumeBarVisibility()
}

const handleDetailsClick = () => {
  router.push('/details')
}

const handleLanguageSelection = (selectedLang) => {
  setSelectedLanguage(selectedLang)
}

const formattedChannel = computed(() => {
  const number = playerStatus.selectedChannel.channelNumber;
  return number >= 10 ? number : `0${number}`;
});

function updateVolumeFromEvent(e) {
  if (!volumeBar.value) return

  const rect = volumeBar.value.getBoundingClientRect() // element dimensions and position
  let newVolume = ((e.clientX - rect.left) / rect.width) * 100 // cursor position relative to bar's width
  newVolume = Math.max(0, Math.min(100, newVolume)) // avoid over and under values

  setVolume(newVolume)
}

function startDrag(e) {
  isDragging = true
  updateVolumeFromEvent(e)
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
}

function onDrag(e) {
  if (isDragging) {
    updateVolumeFromEvent(e)
  }
}

function stopDrag() {
  isDragging = false
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
}

onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
})
</script>

<template>
  <div class="video_control">
    <section class="top">
      <div class="top-left">
        <RoundedButton @click="handleTopMenuClick">
          <img src="../assets/svg/top-menu_icon.svg" :width="iconSize" :height="iconSize"/>
        </RoundedButton> 
        <div class="selected-channel" v-if="!!playerStatus.selectedChannel">
           <img v-if="playerStatus.selectedChannel?.iconSrc" :src="playerStatus.selectedChannel.iconSrc" />
           <p>{{ formattedChannel }} | {{ playerStatus.selectedChannel.channelName }}</p>
        </div>
      </div>
      <div class="top-right">
        <Dropdown :onSelect="handleLanguageSelection" :languages="languageStatus.availableLanguages">
          <p>{{ `${languageStatus.selectedLanguage.flag} ${languageStatus.selectedLanguage.label}` }}</p>
        </Dropdown>
        <img :src="zappingLogo" />
      </div>
    </section>
    <section class="bottom">
      <div class="media">
        <div class="left">
          <RoundedButton @click="handlePlayClick">
            <img src="../assets/svg/play_icon.svg" :width="iconSize" :height="iconSize"/>
          </RoundedButton> 
          <RoundedButton @click="handleVolumeClick">
            <img src="../assets/svg/volume_icon.svg" :width="iconSize" :height="iconSize"/>
          </RoundedButton> 

          <Transition name="fade">
            <div v-if="visibilityStatus.isVolumeBarVisible" class="volume-bar" ref="volumeBar" @mousedown="startDrag">
              <div class="level" :style="{ width: playerStatus.volume + '%' }"></div>
            </div>
          </Transition>
        </div>
        <div class="right">
          <RoundedButton class="no-margin" @click="handleDetailsClick">
            <img src="../assets/svg/details_icon.svg" :width="iconSize" :height="iconSize"/>
          </RoundedButton> 
        </div>
      </div>
      <div class="hotkeys">
        <div class="left">
          <SquaredButtonGroup :label="languageStatus.translations.homePage.mediaControl.hotkeyLabels.change">
            <SquaredButton :url="arrowUp"/>
            <SquaredButton :url="arrowDown"/>
          </SquaredButtonGroup> 
          <SquaredButtonGroup :label="languageStatus.translations.homePage.mediaControl.hotkeyLabels.channels">
            <SquaredButton :url="arrowRight"/>
          </SquaredButtonGroup> 
          <SquaredButtonGroup :label="languageStatus.translations.homePage.mediaControl.hotkeyLabels.info">
            <SquaredButton :url="arrowLeft"/>
          </SquaredButtonGroup> 
          <SquaredButtonGroup :label="languageStatus.translations.homePage.mediaControl.hotkeyLabels.fullScreen">
            <SquaredButton icon="F"/>
          </SquaredButtonGroup> 
          <SquaredButtonGroup :label="languageStatus.translations.homePage.mediaControl.hotkeyLabels.mute">
            <SquaredButton icon="M"/>
          </SquaredButtonGroup> 
        </div>
        <div class="right">
          <SquaredButtonGroup :label="languageStatus.translations.homePage.mediaControl.hotkeyLabels.exit">
            <SquaredButton icon="[ESC]"/>
          </SquaredButtonGroup> 
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.video_control {
  padding: $spacing-xl $spacing-xl $spacing-md $spacing-xl;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .top-left {
      display: flex;
      align-items: center;

      .selected-channel {
        display: flex;
        align-items: center;

        img {
          margin-right: $spacing-xs;
          width: 36px;
        }
      }
    }

    .top-right {
      display: flex;

      p {
        margin-right: $spacing-xs;
      }
    }
  }

  .top, .bottom .media {
    height: fit-content;
    width: 100%;
  }

  .bottom .media {
    display: flex;
    justify-content: space-between;
    margin-bottom: $spacing-lg;

    .left {
      display: flex;
      align-items: center;
    }

    .volume-bar {
      position: relative;
      width: 200px;
      height: 8px;
      background-color: $color-gray-200;
      border-radius: $radius-sm;

      .level {
        position: absolute;
        background-color: $color-primary;
        height: 100%;
        border-radius: $radius-sm;
      }
    }
  }

  .bottom .hotkeys {
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      flex-direction: row;
    }
  }

  .no-margin {
    margin: 0;
  }

  @media (max-width: 780px) {
    padding: $spacing-xs $spacing-xs $spacing-xs $spacing-xs;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>