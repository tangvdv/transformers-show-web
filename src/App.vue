<template>
    <AppHeader />
    <main>
        <div class="container">
            <router-view />
        </div>
    </main>
    <footer></footer>
    <Request ref="RequestComponent" />
</template>

<script>
import AppHeader from "@/components/header.vue"
import Request from "@/components/Request.vue"

export default {
    name: 'App',
    components:{ 
        AppHeader,
        Request
    }
}
</script>