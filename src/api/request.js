/*
 * @Author: your name
 * @Date: 2023-07-04 14:55:41
 * @LastEditTime: 2023-07-06 14:40:42
 * @LastEditors: bogon
 * @Description: In User Settings Edit
 * @FilePath: /electron-vite-vue/src/api/request.js
 */

import axios from 'axios'
import { config } from '../config'
const { baseURL, requestTimeout, contentType } = config

const instance = axios.create({
    baseURL,
    timeout: requestTimeout,
    headers: {
        'Content-Type': contentType,
    },
})

instance.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => {
        const { data, config } = response
        return data
    },
    (error) => {
        const { response, message } = error
        if (error.response && error.response.data) {
            return Promise.reject(error)
        } else {
            let { message } = error
            if (message === 'Network Error') {
                message = '后端接口连接异常'
            }
            if (message.includes('timeout')) {
                message = '后端接口请求超时'
            }
            if (message.includes('Request failed with status code')) {
                const code = message.substr(message.length - 3)
                message = '后端接口' + code + '异常'
            }
            return Promise.reject(error)
        }
    }
)

export default instance
