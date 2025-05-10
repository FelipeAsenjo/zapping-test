import Http from "@/utils/http"
import { model } from "../../CONST"

class TvShowService {

    constructor() {
       this.http = new Http() 
    }

    getShowDetails() {
        this.http.useGet(model.TV_SHOW_DETAILS)
    }
}

export default TvShowService