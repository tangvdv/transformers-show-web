<template>
    <router-link class="alt-poster-div card shadow-sm mx-4 p-0 beauty-link" :to="'/alt/'+alt.id">
        <img class="alt-poster rounded-2" :src="path + alt.image">
        <div class="card-body p-1">
            <p class="card-text text-center m-0 actor-poster-name-small">{{ alt.alt_name }}</p>
        </div>
        <small class="text-muted p-1">{{ show_name }}</small>
    </router-link>
</template>

<script>
export default {
  name: "BotDetailAltCard",
  props: ['alt', 'show_name'],
  data() {
    return {
      path: "http://localhost:5173/images/alt/"
    };
  }
}
</script>