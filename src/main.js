import './assets/main.css'

import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import axios from "axios";
// import VueRouter from 'vue-router'

////axios 配置
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.timeout = 5000;

////路由配置

const HelloWorld = () => import('./components/HelloWorld.vue')
const UserList = () => import('./pages/user/UserList.vue')

const routes = [
    {path: '/', redirect: '/HelloWorld'},
    {path: 'HelloWorld', component: HelloWorld},
    {path: 'UserList', component: UserList}
]
// const  router = VueRouter.createRouter({
//     history: VueRouter.createWebHashHistory(),
//     routes:routes
// });

const app = createApp(App);
app.use(ElementPlus);
app.mount('#app')


