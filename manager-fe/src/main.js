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
app.config.globalProperties.$request = request;
app.config.globalProperties.$api = api;
app.config.globalProperties.$storage = storage;
app.use(router).use(store).use(ElementPlus).mount('#app')