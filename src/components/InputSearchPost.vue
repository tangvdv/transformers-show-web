<template>
    <div class="text-center">
        <input class="form-control my-4" placeholder="Type to search..." v-model="text" @input="this.$emit('filterEvent', text)">
    </div>
</template>

<script>

export default {
    name: "InputSearchPost",
    data() {
        return {
            text: ''
        }
    }

}
</script>