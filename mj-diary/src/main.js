import { createApp } from 'vue'
import App from './App.vue'
import store from './store.js'
import router from './router.js'

const app = createApp(App)

app.use(router).use(store).mount('#app')