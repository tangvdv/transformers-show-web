<template>
  <router-link :class="[ !isVisible ? 'visually-hidden' : '', 'actor-poster-div-regular', 'card', 'shadow-sm', 'mx-4', 'p-0' ]" :to="'/voiceactor/'+id">
      <img class="actor-poster-regular rounded-2" :src="path + image">
      <div class="card-body">
          <p class="card-text text-center fs-5"> {{ voiceactor_name }} </p>
      </div>
    </router-link>
</template>

<script>
export default {
  name: "VoiceActorPostCard",
  props: ['id', 'voiceactor_name', 'image'],
  data() {
    return {
      path: `${import.meta.env.VITE_WEBSITE_URL}/images/voiceactor/`,
      isVisible: true
    };
  }
}
</script>