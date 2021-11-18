import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import StorageKeys from 'constants/LocalStorage'

const axiosUser = axios.create({
    baseURL: process.env.REACT_APP_API_USER,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Add a request interceptor
axiosUser.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        const token = localStorage.getItem(StorageKeys.TOKEN)
        if (token) {
            config.headers.authorization = token
        }

        return config
    },
    (error) => {
        return Promise.reject(error.response)
    }
)

// Add a response interceptor
axiosUser.interceptors.response.use(
    (response: AxiosResponse) => {
        const result = { ...response.data, status: response.status }
        return result
    },

    ({ response }) => {
        const result = { ...response.data, status: response.status }
        return Promise.reject(result)
    }
)

export default axiosUser
