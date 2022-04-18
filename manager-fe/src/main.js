import {
  createApp
} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import api from './api'
import request from './utils/request';
import storage from './utils/storage';

console.log("环境变量=>", import.meta.env);

const app = createApp(App);
// 自定义指令 按钮权限
app.directive('has', {
  deforeMount: (el, binding) => {
    // 获取按钮权限
    let actionList = storage.getItem("actionList");
    let value = binding.value;
    // 盘点列表中能够是否有对挺按钮的权限标识
    let hasPermission = actionList.includes(value);
    if(!hasPermission) {
      el.style = "display: none";
      setTimeout(() => {
        el.parentNode.removeChild(el);
      })
    }
  }
})
// 全局挂载
app.config.globalProperties.$request = request;
app.config.globalProperties.$api = api;
app.config.globalProperties.$storage = storage;

app.use(router).use(store).use(ElementPlus).mount('#app')