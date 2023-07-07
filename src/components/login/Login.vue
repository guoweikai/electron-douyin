<!--
 * @Author: your name
 * @Date: 2023-07-04 16:40:28
 * @LastEditTime: 2023-07-06 16:26:48
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
      <h4 class="title">
        公告:本软件为辅助测试软件，使用者不得利用软件发布违法违规内容，软件不会收集和监控软件运行过程，对用户使用软件用途完全不知情，对软件使用用途已明确告知只能用来做正常合法使用，本辅助对用户使用软件产生的后果不承担任何责任
      </h4>
    </div>
  <div class="content">
    <el-form label-width="80px">
      <el-form-item label="验证码">
        <div class="code-wrap">
          <el-input
            v-model="code"
            placeholder="请输入验证码获取服务器地址"
            class="mr10"
          />
          <el-button type="primary" @click="formCode">获取推流信息</el-button>
        </div>
      </el-form-item>
      <el-form-item label="服务器">
        <div class="streamid-wrap">
          <el-input type="text" v-model="push_url" class="mr10" />
          <el-button type="primary" @click="handleElCopy(push_url)"
            >复制到剪切板</el-button
          >
        </div>
      </el-form-item>
      <el-form-item label="串流秘钥">
        <div class="streamid-wrap">
          <el-input type="text" v-model="push_streamid" class="mr10" />
          <el-button type="primary" @click="handleElCopy(push_streamid)"
            >复制到剪切板</el-button
          >
        </div>
      </el-form-item>
    </el-form>

  </div>
</template>
<script lang="ts" setup>
import { getStream } from "../../api/node";
import { ElNotification, ElLoading } from "element-plus";
import { ref } from "vue";
import { elCopy } from "../../util/index";
let code = ref("");
let push_streamid = ref("");
let push_url = ref("");
const formCode = async () => {
  const loadingInstance = ElLoading.service({ fullscreen: true });
  try {
    let data: any = await getStream(code.value);
    push_streamid.value = data.push_streamid;
    push_url.value = data.push_url;
    ElNotification({
      message: "获取推流地址成功",
      type: "success",
    });
  } catch (error) {
    ElNotification({
      message: "请输入正确的授权码",
      type: "error",
    });
  }
  loadingInstance.close();
};
const handleElCopy = (value: string) => {
  elCopy(value);
  ElNotification({
    message: "已经复制到剪切板上了",
    type: "success",
  });
};
</script>
<style>
.header {
  position: absolute;
  top: 0;
  left:0
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
.streamid-wrap {
  display: flex;
  align-items: center;
}
.el-input {
  width: 350px !important;
}
.code-wrap {
  display: flex;
}
.footer {
  margin-top: 80px;
}
.title {
  text-align: left;
  margin: 0px 10px;
}
</style>
