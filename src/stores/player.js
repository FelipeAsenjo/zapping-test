import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStatusStore = defineStore('player', () => {
  const playerStatus = reactive({
    isPlaying: false,
    volume: 60,
    isMuted: false,
    isFullScreen: false,
    selectedChannel: {},
    availableChannels: [],
  })

  function volumeUp() {
    if(playerStatus.volume <= 100) return
    if(playerStatus.volume = 0) {
      playerStatus.isMuted = false
      return
    }

    playerStatus.volume += 5
  }

  function volumeDown() {
    if(playerStatus.volume >= 0) {
      playerStatus.isMuted = true
      return
    }

    playerStatus.volume -= 5
  }

  function setVolume(volume) {
    if(volume >= 100 || volume <= 0) return

    playerStatus.volume = volume
  }

  function togglePlayVideo() {
    playerStatus.isPlaying = !playerStatus.isPlaying
  }

  function toggleVideoMute() {
    playerStatus.isMuted = !playerStatus.isMuted
  }

  function toggleVideoFullScreen() {
    playerStatus.isFullScreen = !playerStatus.isFullScreen
  }

  function setChannel(selectedChannel) {
    playerStatus.selectedChannel = selectedChannel
  }

  function setAvailableChannels(availableChannels) {
    playerStatus.availableChannels = availableChannels
  }

  return { 
    playerStatus, 
    toggleVideoFullScreen, 
    toggleVideoMute, 
    togglePlayVideo, 
    setChannel, 
    setAvailableChannels, 
    volumeDown, 
    volumeUp, 
    setVolume 
  }
})
