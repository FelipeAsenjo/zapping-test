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

        setSelectedLanguage(availableLanguages[0])
        setAvailableLanguages(availableLanguages)
    }
}

export default LanguageService