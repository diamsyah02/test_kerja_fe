import axios from 'axios'

const url = "http://localhost:4000/api/v1/"

export const postData = async (paramUrl, body) => {
    try {
        const res = await axios.post(url + paramUrl, body, {})
        return res
    } catch (e) {
        return e.response
    }
}

export const getData = async (paramUrl) => {
    try {
        const res = await axios.get(url + paramUrl, {})
        return res
    } catch (e) {
        return e.response
    }
}