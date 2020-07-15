import axios from 'axios'
export const runCallback = (callback) => {
    callback('abc')
}

export const getData = (callback) => {
    return axios.get('/api').then(res => res.data)
}