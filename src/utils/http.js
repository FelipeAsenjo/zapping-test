import { envs } from '../../CONST'
import mockData from '../mocks/mockData.json'

class Http {

    constructor() {
        this.currentEnv = import.meta.env.MODE
    }

    async useGet(url, getRealData = false, query = '') {
        if(getRealData) {
            try {
                const res = await fetch(url)
                const { data } = await res.json()

                return data
            } catch(err) {
                console.log('error', err)
            }
        } else {
            try {
                return mockData[url]
            } catch(err) {
                console.log('error', err)
            }
        }
        // if(this.currentEnv === envs.DEV || !getRealData) {
        //     try {
        //         return mockData[url]
        //     } catch(err) {
        //         console.log('error', err)
        //     }
        // } else {
        //     console.log('HERE 3')

        // }
    }
}

export default Http