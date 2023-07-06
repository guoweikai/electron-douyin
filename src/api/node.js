/*
 * @Author: your name
 * @Date: 2023-07-04 14:56:38
 * @LastEditTime: 2023-07-04 15:13:57
 * @LastEditors: bogon
 * @Description: In User Settings Edit
 * @FilePath: /electron-vite-vue/src/api/node.js
 */
import request from "./request.js"

export function getNodeList() {
    return request({
        url: `/v1/node/get`,
        method: 'post',
    })
}