import { createApp } from 'vue'
import App from './App.vue'
import {createRouter,createWebHistory} from 'vue-router'
import Home from './views/home/index.vue'
import Form from './views/info-sub/index.vue'

const routes = [
    { path: '/', component: Home },
  { path: '/create', component: Form },
]
const router = createRouter({
    history: createWebHistory('/'),
    routes,
})

createApp(App).use(router).mount('#app')
