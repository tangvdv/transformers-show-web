import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'home', component: () => import('/src/views/Index.vue') },

    { path: '/show', name: 'shows', component: ()=> import('/src/views/show/ShowPost.vue') },
    { path: '/show/:id', name: 'show', component: ()=> import('/src/views/show/ShowDetail.vue') },

    { path: '/character', name: 'bots', component: () => import('/src/views/character/CharacterPost.vue') },
    { path: '/character/:id', name: 'bot', component: () => import('/src/views/character/CharacterDetail.vue') },
            
    { path: '/alt', name: 'alts', component: () => import('/src/views/alt/AltPost.vue') },
    { path: '/alt/:id', name: 'alt', component: () => import('/src/views/alt/AltDetail.vue') },

    { path: '/actor', name: 'actors', component: () => import('/src/views/actor/ActorPost.vue') },
    { path: '/actor/:id', name: 'actor', component: () => import('/src/views/actor/ActorDetail.vue') },

    { path: '/voiceactor', name: 'voiceactors', component: () => import('/src/views/voiceactor/VoiceActorPost.vue') },
    { path: '/voiceactor/:id', name: 'voiceactor', component: () => import('/src/views/voiceactor/VoiceActorDetail.vue') },

    { path: '/:pathMatch(.*)*', name: 'Notfound', component: () => import('/src/views/RedirectStatusCode.vue'), props: { "code": 404, message: "This page does not exist", redirect_url: "/" } }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router