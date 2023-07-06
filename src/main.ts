import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "./samples/node-api";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./lib/XfutrueWeb.js";
createApp(App)
  .use(ElementPlus)
  .mount("#app")
  .$nextTick(() => {
    postMessage({ payload: "removeLoading" }, "*");
  });
