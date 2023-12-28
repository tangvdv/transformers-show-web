<template>
    <AppHeader />
    <main>
        <div class="container">
            <router-view></router-view>
        </div>
    </main>
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