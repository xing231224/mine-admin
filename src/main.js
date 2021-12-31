/*
 * @Author: your name
 * @Date: 2021-12-24 10:34:51
 * @LastEditTime: 2021-12-30 18:29:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \1688_demo\src\main.js
 */
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/zh-CN";
import App from "./App";
import router from "./router";
import store from "./store";
import "@/directive/Drag/index.js";
import * as filters from "./filters"; // 全局filter
import "@/icons"; // icon
import '@/permission' // 权限
import * as socketApi from './utils/crmSocket'
import constList from "./utils/constClass";
import {tips} from "./utils/mineUtils"
Vue.prototype.socketApi = socketApi
Vue.prototype.constList = constList;
Vue.prototype.$tips = tips;
Vue.use(ElementUI, { locale });
//富文本编译器
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import myDistrict from "my-district";
Vue.use(myDistrict);
Vue.use(VueQuillEditor);
// 全局过滤器.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// 全局指令获取焦点
Vue.directive("focus", function(el, option) {
  var defClass = "el-input",
    defTag = "input";
  var value = option.value || true;
  if (typeof value === "boolean")
    value = { cls: defClass, tag: defTag, foc: value };
  else
    value = {
      cls: value.cls || defClass,
      tag: value.tag || defTag,
      foc: value.foc || false
    };
  if (el.classList.contains(value.cls) && value.foc)
    el.getElementsByTagName(value.tag)[0].focus();
});
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
