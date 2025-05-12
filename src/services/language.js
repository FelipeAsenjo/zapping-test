import Http from "@/utils/http"
import { model } from "../../CONST"
import { useLanguageStore } from "@/stores/language"

class LanguageService {

    constructor() {
       this.http = new Http() 
       this.languageStore = useLanguageStore()
    }

    async getAvailableLanguages() {
        const { setSelectedLanguage, setAvailableLanguages } = this.languageStore
        const availableLanguages = await this.http.useGet(model.AVAILABLE_LANGUAGES)

        if(!Object.keys(this.languageStore.languageStatus.selectedLanguage).length) {
            setSelectedLanguage(availableLanguages[0])
        }
        setAvailableLanguages(availableLanguages)
    }

    async getTranslations() {
        const { languageStatus, setTranslations } = this.languageStore
        const translations = await this.http.useGet(model.I18n)
        const selectedLanguage = languageStatus.selectedLanguage.label

        setTranslations(translations[selectedLanguage])
    }
}

export default LanguageService