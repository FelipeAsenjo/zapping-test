<script setup>
import RoundedButton from '@/components/RoundedButton.vue'

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

        </div>
        <div class="right">

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
  }

  .no-margin {
    margin: 0;
  }
}
</style>