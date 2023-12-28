<template>
    <div class="text-center">
        <input class="form-control my-4" placeholder="Type to search..." v-model="text" @input="filter">
    </div>
    <router-view ref="view" />
</template>

<script>

export default {
    name: "Main",
    data() {
        return {
            text: ''
        }
    },

    methods: {
        filter() {
            this.$refs.view.test()
        }
    }

}
</script>