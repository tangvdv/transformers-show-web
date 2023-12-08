<template>
    <AppHeader />
    <main>
        <div class="container">
            <div class="text-center">
                <input class="form-control my-4" placeholder="Type to search..." v-model="text" @input="filter">
            </div>
            <ShowPost ref="showPostComponent" />
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
    },

    data() {
        return {
            text: ''
        }
    },

    methods: {
        filter() {
            this.$refs.showPostComponent.filterPosts(this.text)
        }
    }
}
</script>