<template>
    <div v-for="skin in skins" class="d-flex row">
        <h4 class="px-4">{{ skin.show.show_name }}</h4>
        <BotDetailVoiceActorCard
            v-for="voiceactor in skin.voiceactor"
            :key="voiceactor.id"
            :voiceactor="voiceactor"
        />
        <br>
    </div>
</template>

<script>
import BotDetailVoiceActorCard from '@/components/bot/BotDetailVoiceActorCard.vue';

export default {
  name: "BotDetailVoiceActor",
  components: {
    BotDetailVoiceActorCard
  },
  props: ['skins']
}
</script>