/*
 * @Author: your name
 * @Date: 2023-07-06 14:51:20
 * @LastEditTime: 2023-07-06 14:53:26
 * @LastEditors: bogon
 * @Description: In User Settings Edit
 * @FilePath: /electron-vite-vue/src/util/index.ts
 */

export const elCopy = (text: string) => {
  // 创建一个临时的 textarea 元素
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);

  // 选中 textarea 中的文本
  textarea.select();

  // 执行复制命令
  document.execCommand("copy");

  // 移除临时元素
  document.body.removeChild(textarea);
};
