/*
 * @Author: your name
 * @Date: 2023-07-03 16:57:22
 * @LastEditTime: 2023-07-04 17:23:44
 * @LastEditors: bogon
 * @Description: In User Settings Edit
 * @FilePath: /electron-vite-vue/src/lib/XfutrueWeb.js
 */

const xFutureInstance = require("xfuture");


class XfutrueWeb {
    install() {
        const shell_path = `${process.cwd()}/node_modules/xfuture/package/mac/install_helper.sh`
        const helper_path = `${process.cwd()}/node_modules/xfuture/package/mac/xfuture_helper`
        xFutureInstance.Install(shell_path, helper_path)
    }
    SetupURL(url) {
        xFutureInstance.SetupURL(url)
        this.install();

    }
    close() {
        xFutureInstance.Close()

    }
}

export default XfutrueWeb


