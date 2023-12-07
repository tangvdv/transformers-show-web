<template>
    <AppHeader />
    <router-view>
    </router-view>
    <footer></footer>
</template>

<script>
import AppHeader from "./components/header.vue"

export default {
    name: 'App',
    components:{ 
        AppHeader
    }
}
</script>