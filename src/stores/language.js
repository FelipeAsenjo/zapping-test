import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', () => {
  const languageStatus = reactive({
    selectedLanguage: {},
    availableLanguages: [],
    translations: {}
  })

  function setSelectedLanguage(selectedLanguage) {
    languageStatus.selectedLanguage = selectedLanguage
  }

  function setAvailableLanguages(availableLanguages) {
    languageStatus.availableLanguages = availableLanguages
  }

  function setTranslations(translations) {
    languageStatus.translations = { ...translations }
  }

  return { languageStatus, setSelectedLanguage, setAvailableLanguages, setTranslations }
})
