import { createApp } from 'vue'
import App from './App.vue'
import store from './store.js'
import router from './router.js'
import axios from 'axios'

const app = createApp(App)

app.config.globalProperties.axios = axios;

app.use(router).use(store).mount('#app')