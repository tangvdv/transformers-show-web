<template>
    <router-link class="alt-poster-div card shadow-sm mx-4 beauty-link" :to="'/alt/'+alt.id">
        <img class="alt-poster rounded-2" :src="path + alt.image">
        <div class="card-body">
            <p class="card-text text-center m-0 actor-poster-name-small">{{ alt.alt_name }}</p>
        </div>
    </router-link>
</template>

<script>
export default {
  name: "BotDetailCardAlt",
  props: ['alt'],
  data() {
    return {
      path: `${import.meta.env.VITE_WEBSITE_URL}/images/alt/`
    };
  }
}
</script>