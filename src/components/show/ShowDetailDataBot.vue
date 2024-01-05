<template>
    <tr>
        <td class="p-0">
            <div class="row justify-content-center text-center px-3" style="vertical-align: middle">
                <router-link class="div-bot-table col-md-7 themed-grid-col py-2" :to="'/bot/'+bot.id">
                    <div class="row align-items-center">
                        <div class="col-md-3 themed-grid-col"><img :src="path + image" class="table-bot-poster"></div>
                        <div class="col-md-3 themed-grid-col">{{ bot.bot_name }}</div>
                        <div class="col-md-3 themed-grid-col">{{ bot.faction }}</div>
                        <div class="col-md-3 themed-grid-col">{{ secondsToHMS(screen_time) }}</div>
                    </div>
                </router-link>
                <router-link class="d-flex align-items-center justify-content-center div-alt-table col-md-2 themed-grid-col py-2" :to="'/alt/'+alt.id">{{ alt.alt_name }}</router-link>
                <router-link v-if="voiceactor" :class="[ 'd-flex', 'align-items-center', 'justify-content-center', 'div-va-table', 'col-md-2', 'themed-grid-col', 'py-2']" :to="'/voiceactor/'+voiceactor.id"> {{ voiceactor.voiceactor_name }}</router-link>
                <div v-else :class="['d-flex', 'align-items-center', 'justify-content-center', 'col-md-2', 'themed-grid-col', 'py-2']"></div>
            </div>
        </td>
    </tr>
</template>
<script>

export default {
  name: "ShowDetailDataBot",
  props: ['id', 'image', 'screen_time', 'bot', 'alt', 'voiceactor'],
  data() {
    return {
      path: "http://localhost:5173/images/show/"
    };
  },
  methods:{
    secondsToHMS(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);
    
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
  }
}
</script>