<template>
    <router-link class="actor-poster-div-small card shadow-sm mx-4 p-0" :to="'/actor/'+id">
        <img class="actor-poster-small rounded-2" :src="path + image">
        <div class="card-body p-1">
            <p class="card-text text-center m-0 actor-poster-name-small">{{ actor_name }}</p>
            <p class="card-text text-center actor-poster-character-small" style="font-size: small;"><em>{{ character }}</em></p>
        </div>
    </router-link>
</template>

<script>
export default {
  name: "ShowDetailDataActor",
  props: ['id', 'actor_name', 'character', 'image'],
  data() {
    return {
      path: `${import.meta.env.VITE_WEBSITE_URL}/images/actor/`
    };
  }
}
</script>