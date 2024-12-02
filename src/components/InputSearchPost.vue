<template>
    <div class="search-bar shadow flex">
        <input class="input flex-grow" placeholder="Search..." v-model="text" @input="this.$emit('filterEvent', text)">
        <div class="search-glass flex-basis flex justify-content-center">
            <img :src="path" />
        </div>
    </div>
</template>

<script>

export default {
    name: "InputSearchPost",
    data() {
        return {
            text: '',
            path: `${import.meta.env.VITE_WEBSITE_URL}/src/assets/search_glass.svg`
        }
    }

}
</script>