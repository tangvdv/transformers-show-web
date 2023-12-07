const factionArray = {
    1 : "Autobot",
    2 : "Decepticon",
    3 : "Maximal",
    4 : "Predacon",
    5 : "Terrorcon"
}

const origin = {
    1 : "American",
    2 : "English",
    3 : "Japanese",
    4 : "German",
    5 : "Spanish",
    6 : "French"
}

import { createApp } from 'vue/dist/vue.esm-bundler'

import Head from '/src/components/head.vue'
import Show from '/src/components/show.vue'
import App from './App.vue'

const showContainer = document.getElementById("show-container")
if(showContainer){
    //createApp(Show).mount(showContainer)
}

createApp(App).mount(document.body)
createApp(Head).mount(document.head)