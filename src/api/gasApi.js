import axios from 'axios'

const gasApi = axios.create({
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    }
})
gasApi.defaults.baseURL = 'https://script.google.com/macros/s/AKfycbwP22bVhsYxWu-7UURu-DE644h5993GhflogYU7UySsPTR0qXI/exec'
let apiToken = 'EXfQr2qWcKRRqM29Btwgqkci9RiGMP83'

gasApi.interceptors.response.use(res => {
    if (res.data.status === 'error') {
        return Promise.reject(res.data.status)
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

export default {
    post,
    get
}