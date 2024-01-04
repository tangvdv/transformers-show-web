import { createApp } from 'vue/dist/vue.esm-bundler'
import router from '/src/router/index.js'

import Head from '/src/components/head.vue'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.mount('#app')

createApp(Head).mount(document.head)