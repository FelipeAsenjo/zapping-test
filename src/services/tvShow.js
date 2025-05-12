import Http from "@/utils/http"
import { model } from "../../CONST"

class TvShowService {

    constructor() {
       this.http = new Http() 
    }

    async getShowDetails() {
        const res = await this.http.useGet(model.TV_SHOW_DETAILS)
        return res
    }
}

export default TvShowService