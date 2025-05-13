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

        const sortedChannels = availableChannels.sort((a, b) => {
            if(a.channelNumber < b.channelNumber) return -1
            if(a.channelNumber > b.channelNumber) return 1
            return 0
        })

        setAvailableChannels(sortedChannels)
        setChannel(sortedChannels[0])
    }
}

export default ChannelService