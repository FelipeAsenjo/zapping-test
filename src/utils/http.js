import { envs } from '../../CONST'
import mockData from '../mocks/mockData.json'

class Http {

    constructor() {
        this.currentEnv = import.meta.env.MODE
    }

    async useGet(url, query = '') {
        if(this.currentEnv === envs.DEV) {
            try {
                return mockData[url]
            } catch(err) {
                console.log('error', err)
            }
        }
    }
}

export default Http