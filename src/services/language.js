import Http from "@/utils/http"
import { model } from "../../CONST"

class LanguageService {

    constructor() {
       this.http = new Http() 
    }

    getAvailableLanguages() {
        this.http.useGet(model.AVAILABLE_LANGUAGES)
    }
}

export default LanguageService