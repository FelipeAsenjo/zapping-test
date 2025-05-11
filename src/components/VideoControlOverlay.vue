<script setup>
import RoundedButton from '@/components/RoundedButton.vue'
import SquaredButtonGroup from '@/components/SquaredButtonGroup.vue'
import SquaredButton from '@/components/SquaredButton.vue'

import arrowUp from '../assets/svg/arrow-up.svg'
import arrowDown from '../assets/svg/arrow-down.svg'
import arrowLeft from '../assets/svg/arrow-left.svg'
import arrowRight from '../assets/svg/arrow-right.svg'

const iconSize = 20

const handleTopMenuClick = () => {
  console.log('handleTopMenuClick')
}

const handlePlayClick = () => {
  console.log('handlePlayClick')
}

const handleVolumeClick = () => {
  console.log('handleVolumeClick')
}

const handleDetailsClick = () => {
  console.log('handleDetailsClick')
}
</script>

<template>
  <div class="video_control">
    <section class="top">
      <div class="top-left">
        <RoundedButton @click="handleTopMenuClick">
          <img src="../assets/svg/top-menu_icon.svg" :width="iconSize" :height="iconSize"/>
        </RoundedButton> 
      </div>
      <div class="top-right">

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
        </div>
        <div class="right">
          <RoundedButton class="no-margin" @click="handleDetailsClick">
            <img src="../assets/svg/details_icon.svg" :width="iconSize" :height="iconSize"/>
          </RoundedButton> 
        </div>
      </div>
      <div class="hotkeys">
        <div class="left">
          <SquaredButtonGroup label="Cambiar">
            <SquaredButton :url="arrowUp"/>
            <SquaredButton :url="arrowDown"/>
          </SquaredButtonGroup> 
          <SquaredButtonGroup label="Canales">
            <SquaredButton :url="arrowRight"/>
          </SquaredButtonGroup> 
          <SquaredButtonGroup label="Info">
            <SquaredButton :url="arrowLeft"/>
          </SquaredButtonGroup> 
          <SquaredButtonGroup label="Pantalla completa">
            <SquaredButton icon="F"/>
          </SquaredButtonGroup> 
          <SquaredButtonGroup label="Silencio">
            <SquaredButton icon="M"/>
          </SquaredButtonGroup> 
        </div>
        <div class="right">
          <SquaredButtonGroup label="Salir">
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

  .top, .bottom .media {
    height: fit-content;
    width: 100%;
  }

  .bottom .media {
    display: flex;
    justify-content: space-between;
    margin-bottom: $spacing-lg;
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
}
</style>