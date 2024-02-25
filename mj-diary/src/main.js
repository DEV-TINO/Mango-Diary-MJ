import { createApp } from 'vue'
import App from './App.vue'
import store from './store.js'
import router from './router.js'
import axios from 'axios'
import '@/style/fonts.css'

const app = createApp(App)

app.config.globalProperties.axios = axios;

app.use(router).use(store).mount('#app')