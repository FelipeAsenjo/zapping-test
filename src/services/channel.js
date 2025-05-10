import Http from "@/utils/http"
import { model } from "../../CONST"

class ChannelService {

    constructor() {
       this.http = new Http() 
    }

    getShowDetails() {
        this.http.useGet(model.AVAILABLE_CHANNELS)
    }
}

export default ChannelService