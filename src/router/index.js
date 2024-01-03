import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/:pathMatch(.*)*', name: 'Notfound', component: () => import('/src/views/404.vue') },
    { path: '/', name: 'home', component: ()=> import('/src/views/Main.vue'),
        children: [
            { path: '/show', name: 'shows', component: ()=> import('/src/views/show/ShowPost.vue') },
            { path: '/show/:id', name: 'show', component: ()=> import('/src/views/show/ShowDetail.vue') },

            { path: '/bot', name: 'bots', component: () => import('/src/views/bot/BotPost.vue') },
            { path: '/bot/:id', name: 'bot', component: () => import('/src/views/bot/BotDetail.vue') },            
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router