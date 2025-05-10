import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStatusStore = defineStore('player', () => {
  const playerStatus = reactive({
    stopped: false,
    volume: 60,
    isMuted: false,
    isFullScreen: false,
    selectedChannel: 0,
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
    if(volume >= 100 || volumen <= 0) return

    playerStatus.volume = volume
  }

  function togglePlay() {
    playerStatus.stopped = !playerStatus.stopped
  }

  function toggleMute() {
    playerStatus.stopped = !playerStatus.stopped
  }

  function toggleFullScren() {
    playerStatus.stopped = !playerStatus.stopped
  }

  function setChannel(selectedChannel) {
    playerStatus.selectedChannel = selectedChannel
  }

  function setAvailableChannels(availableChannels) {
    playerStatus.availableChannels = availableChannels
  }

  return { 
    playerStatus, 
    toggleFullScren, 
    toggleMute, 
    togglePlay, 
    setChannel, 
    setAvailableChannels, 
    volumeDown, 
    volumeUp, 
    setVolume 
  }
})
