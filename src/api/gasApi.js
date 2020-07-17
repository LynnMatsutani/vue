import axios from 'axios'

const gasApi = axios.create({
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    }
})
gasApi.defaults.baseURL = process.env.VUE_APP_GAS_URL
let apiToken = process.env.VUE_APP_TOKEN

gasApi.interceptors.response.use(res => {
    if (res.data.error) {
        return Promise.reject(res.data.error)
    }
    return Promise.resolve(res)
}, err => {
    return Promise.reject(err)
})

const post = item => {
    return gasApi.post('', {
        method: 'POST',
        token: apiToken,
        item
    })
}

const get = function(){
    return gasApi.post('', {
        method: 'GET',
        token: apiToken,

    })
}

const getNames = item => {
    return gasApi.post('', {
        method: 'GET',
        token: apiToken,
        item
    })
}

export default {
    post,
    get,
    getNames
}