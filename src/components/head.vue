<template>
    <link href="/src/assets/css/tfshow.css" rel="stylesheet">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> {{ title }} </title>
</template>

<script>
    export default{
        data() {
            return {
                title: ''
            }
        },

        mounted() {
            this.title = document.head.getAttribute('title')
        }
    }
</script>