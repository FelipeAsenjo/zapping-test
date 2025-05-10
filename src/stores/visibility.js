import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useVisibilityStore = defineStore('visibility', () => {
  const visibilityStatus = reactive({
    areControlsVisible: false,
    areChannelsVisible: false,
    isVolumeBarVisible: false,
  })

  function toggleControlsVisibility() {
    visibilityStatus.areControlsVisible = !visibilityStatus.areControlsVisible
  }

  function showVideoControls() {
    visibilityStatus.areControlsVisible = true
  }

  function hideVideoControls() {
    visibilityStatus.areControlsVisible = false
  }

  function toggleChannelsVisibility() {
    visibilityStatus.areChannelsVisible = !visibilityStatus.areChannelsVisible
  }

  function toggleVolumeBarVisibility() {
    visibilityStatus.isVolumeBarVisible = !visibilityStatus.isVolumeBarVisible
  }

  return { 
    visibilityStatus, 
    toggleChannelsVisibility, 
    toggleControlsVisibility, 
    showVideoControls,
    hideVideoControls,
    toggleVolumeBarVisibility,
  }
})
