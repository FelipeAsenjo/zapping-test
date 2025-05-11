import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', () => {
  const languageStatus = reactive({
    selectedLanguage: {},
    availableLanguages: [],
  })

  function setSelectedLanguage(selectedLanguage) {
    languageStatus.selectedLanguage = selectedLanguage
  }

  function setAvailableLanguages(availableLanguages) {
    languageStatus.availableLanguages = availableLanguages
  }

  return { languageStatus, setSelectedLanguage, setAvailableLanguages }
})
