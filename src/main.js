import { createApp }    from    'vue/dist/vue.esm-bundler'
import router           from    '@/router/index.js'
import Head             from    '@/components/Head.vue'
import App              from    '@/App.vue'

createApp(App).use(router).mount('#app')
createApp(Head).mount(document.head)