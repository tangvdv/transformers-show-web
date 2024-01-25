<template>
    <div type="button" :class="['mx-2', 'shadow']" v-on:click="this.$emit('skinDetailEvent', id)">
        <img class="skin-poster rounded-2" :src="path + image">
    </div>
</template>

<script>
export default {
name: "BotDetailShowCard",
props: ['id', 'show_name', 'image'],
data() {
    return {
        path: "http://localhost:5173/images/show/"
    };
}
}
</script>