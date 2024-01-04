import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'home',
        children: [
            { path: '/:pathMatch(.*)*', name: 'Notfound', component: () => import('/src/views/RedirectStatusCode.vue'), props: { "code": 404, message: "This page does not exist", redirect_url: "/" } },

            { path: '/show', name: 'shows', component: ()=> import('/src/views/show/ShowPost.vue') },
            { path: '/show/:id', name: 'show', component: ()=> import('/src/views/show/ShowDetail.vue') },

            { path: '/bot', name: 'bots', component: () => import('/src/views/bot/BotPost.vue') },
            { path: '/bot/:id', name: 'bot', component: () => import('/src/views/bot/BotDetail.vue') },
            
            { path: '/alt', name: 'alts', component: () => import('/src/views/alt/AltPost.vue') },
            { path: '/alt/:id', name: 'alt', component: () => import('/src/views/alt/AltDetail.vue') },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router