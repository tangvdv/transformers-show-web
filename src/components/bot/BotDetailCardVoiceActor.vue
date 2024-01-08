<template>
    <router-link v-if="voiceactor" class="actor-poster-div-small card shadow-sm mx-4 p-0 beauty-link" :to="'/voiceactor/'+voiceactor.id">
        <img class="actor-poster-small rounded-2" :src="path + voiceactor.image">
        <div class="card-body p-1">
            <p class="card-text text-center m-0 actor-poster-name-small">{{ voiceactor.voiceactor_name }}</p>
        </div>
        <small class="text-muted p-1">{{ originArray[voiceactor.origin] }}</small>
    </router-link>
</template>

<script>
export default {
  name: "BotDetailCardVoiceActor",
  props: ['voiceactor'],
  data() {
    return {
      path: "http://localhost:5173/images/voiceactor/",
      originArray: {
            1 : "American",
            2 : "English",
            3 : "Japanese",
            4 : "German",
            5 : "Spanish",
            6 : "French"
        }
    };
  }
}
</script>