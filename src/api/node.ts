/*
 * @Author: your name
 * @Date: 2023-07-04 14:56:38
 * @LastEditTime: 2023-07-06 15:30:59
 * @LastEditors: bogon
 * @Description: In User Settings Edit
 * @FilePath: /electron-vite-vue/src/api/node.js
 */
import request from "./request"

export function getStream(code:string) {
    return request({
        url: `/api/v1/query/stream/code?verification_code=${code}`,
        method: 'get',
    })
}