<template>
    <AppHeader />
    <main>
        <div class="container">
            <div class="text-center">
                <input class="form-control my-4" type="search" placeholder="Type to search...">
            </div>
            <ShowPost />
        </div>
    </main>
    <footer></footer>
</template>

<script>
import AppHeader from "./components/header.vue"
import ShowPost from "./components/ShowPost.vue"

export default {
    name: 'App',
    components:{ 
        AppHeader,
        ShowPost
    }
}
</script>