import { envs } from '../../CONST'
import mockData from '../mocks/mockData.json'

class Http {

    constructor() {
        this.currentEnv = import.meta.env.MODE
    }

    useGet(url, query = '') {
        if(this.currentEnv === envs.DEV) {
            console.log('mockData', mockData[url])
            return
        }
    }
}

export default Http