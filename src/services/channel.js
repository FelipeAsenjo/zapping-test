import Http from "@/utils/http"
import { model } from "../../CONST"
import { usePlayerStatusStore } from "@/stores/player"

class ChannelService {

    constructor() {
       this.http = new Http() 
       this.playerStore = usePlayerStatusStore()
    }

    async getAvailableChannels() {
        const { setAvailableChannels, setChannel } = this.playerStore
        const availableChannels = await this.http.useGet(model.AVAILABLE_CHANNELS)

        setAvailableChannels(availableChannels)
        setChannel(availableChannels[0])
    }
}

export default ChannelService