<template>
    <div>
        <BotDetailAltCard 
            v-for="skin in skins"
            :key="skin.id"
            :alt="skin.alt"
            :show_name="skin.show.show_name"
        />
    </div>
</template>

<script>
import BotDetailAltCard from '@/components/bot/BotDetailAltCard.vue';

export default {
  name: "BotDetailAlt",
  components: {
    BotDetailAltCard
  },
  props: ['skins']
}
</script>