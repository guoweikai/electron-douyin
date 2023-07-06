<!--
 * @Author: your name
 * @Date: 2023-07-04 16:40:28
 * @LastEditTime: 2023-07-04 20:09:27
 * @LastEditors: bogon
 * @Description: In User Settings Edit
 * @FilePath: /electron-vite-vue/src/components/login/Login copy.vue
-->
<!--
 * @Author: your name
 * @Date: 2023-07-03 16:36:35
 * @LastEditTime: 2023-07-04 16:40:16
 * @LastEditors: bogon
 * @Description: In User Settings Edit
 * @FilePath: /electron-vite-vue/src/components/login/Login.vue
-->
<template>
  <div class="header">
    <el-button @click="handleClick" type="primary">网络加速</el-button>
  </div>
  <div class="content" v-if="!isOpen">
    <h2>1.登录 chatGPT 请一定打开网络加速</h2>
    <h2>2.授权码请联系客服人员获取</h2>
  </div>

  <el-dialog
    v-model="dialogVisibleCode"
    title="请输入授权码"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <el-input placeholder="请输入授权码" v-model="code" clearable> </el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="formCode"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="dialogVisibleNet"
    title="网络加速"
    :modal="false"
    width="300px"
    modal-class="net-class"
  >
    <ul>
      <li v-for="item in vpnList" :key="item.id">
        <span>{{ item.city_cn }}</span>
        <el-switch
          @change="switchOpen(item)"
          v-model="item.isOpen"
          active-text="打开"
          inactive-text="关闭"
        />
      </li>
    </ul>
  </el-dialog>
  <iframe v-if="isOpen" src="https://chat.openai.com"></iframe>
</template>
<script lang="ts" setup>
import XfutrueWeb from "../../lib/XfutrueWeb.js";
import { getNodeList } from "../../api/node.js";
import { ref, onMounted } from "vue";
const xfutrueWeb = new XfutrueWeb();

onMounted(async () => {
  let { data } = await getNodeList();
  data.forEach((item: VpnListItem) => {
    item.isOpen = false;
  });
  vpnList.value = data;
});
type VpnListItem = {
  address: String;
  address_1level_proxy: String;
  address_cn: String;
  address_cn_private: String;
  city_cn: String;
  city_en: String;
  continent: String;
  country: String;
  created_at: String;
  id: Number;
  ip: Number;
  is_disable: Boolean;
  is_vip: Boolean;
  port: Number;
  updated_at: String;
  isOpen?: Boolean;
};
const dialogVisibleCode = ref(true);
let dialogVisibleNet = ref(false);
let isOpen = ref(false);
let code = ref("");
let vpnList = ref([]);
const formCode = () => {
  dialogVisibleCode.value = false;
  xfutrueWeb.install();
};
const switchOpen = (item: VpnListItem) => {
  vpnList.value.forEach((vpnItem: VpnListItem) => {
    if (item.isOpen) {
      item.isOpen = false;
      xfutrueWeb.close();
    }
  });
  if (item.isOpen) {
    item.isOpen = false;
    xfutrueWeb.close();
  } else {
    item.isOpen = true;
    xfutrueWeb.SetupURL(item.address);
    dialogVisibleNet.value = false;
    isOpen.value = true;
    // window.location.href ="https://chat.openai.com"
  }
};
const handleClick = () => {
  dialogVisibleNet.value = true;
};
</script>
<style>
.header {
  position: absolute;
  top: 0;
  right: 5px;
}
.net-class .el-dialog__body {
  padding-top: 0;
  padding-left: 0;
  height: 300px;
  overflow-y: auto;
}
.el-dialog__body ul {
  padding-left: 20px;
}
.el-dialog__body li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content {
  position: absolute;
  left: 50%; /* 定位父级的50% */
  top: 50%;
  transform: translate(-50%, -50%); /*自己的50% */
}
iframe {
  width: 100%;
  height: 100vh;
  border: none;
}
</style>
