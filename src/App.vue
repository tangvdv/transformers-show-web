<template>
        <HeaderHomePage v-if="homePage"></HeaderHomePage>
        <Header v-else></Header>
    <main>
        <div class="container">
            <router-view />
        </div>
    </main>
    <footer></footer>
    <Request ref="RequestComponent" />
</template>

<script>
import Header from "@/components/Header.vue"
import HeaderHomePage from "@/components/HeaderHomePage.vue"
import Request from "@/components/Request.vue"

export default {
    name: 'App',
    components:{ 
        Header,
        HeaderHomePage,
        Request
    },
    computed: {
      homePage() {
        if(this.$route.path == "/") {
          return true
        } else {
          return false
        }
      }
    }
}
</script>