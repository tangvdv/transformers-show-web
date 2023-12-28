import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/:pathMatch(.*)*', name: 'Notfound', component: '404' },
    { path: '/', name: 'home', component: ()=> import('/src/views/Main.vue'),
        children: [
            { path: '/show', name: 'shows', component: ()=> import('/src/views/ShowPost.vue') },
        ]
    },
    { path: '/show/:id', name: 'show', component: ()=> import('/src/views/ShowDetail.vue') }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router