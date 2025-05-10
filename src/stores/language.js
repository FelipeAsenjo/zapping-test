import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', () => {
  const languageSelected = reactive({
    selectedLanguage: '🇪🇸 ES',
    availableLanguages: [],
  })

  function setSelectedLanguage(selectedLanguage) {
    languageSelected.selectedLanguage = selectedLanguage
  }

  function setAvailableLanguages(availableLanguages) {
    languageSelected.availableLanguages = availableLanguages
  }

  return { languageSelected, setSelectedLanguage, setAvailableLanguages }
})
