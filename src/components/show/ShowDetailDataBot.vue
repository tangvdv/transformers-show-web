<template>
    <tr>
        <td class="p-0">
            <div class="row justify-content-center text-center px-3" style="vertical-align: middle">
                <router-link class="div-bot-table col-md-7 themed-grid-col py-2 beauty-link" :to="'/bot/'+bot.id">
                    <div class="row align-items-center">
                        <div class="col-md-3 themed-grid-col">
                          <img v-if="imageLoaded" :src="path + image" class="table-bot-poster">
                          <div v-else class="table-bot-poster bg-default rounded-2">
                            <img class="image-center" :src="default">
                          </div>
                        </div>
                        <div class="col-md-3 themed-grid-col">{{ bot.bot_name }}</div>
                        <div class="col-md-3 themed-grid-col">{{ factionArray[bot.faction] }}</div>
                        <div class="col-md-3 themed-grid-col">{{ secondsToHMS(screen_time) }}</div>
                    </div>
                </router-link>
                <router-link class="d-flex align-items-center justify-content-center div-alt-table col-md-2 themed-grid-col py-2 beauty-link" :to="'/alt/'+alt.id">{{ alt.alt_name }}</router-link>
                <router-link v-if="voiceactor" :class="[ 'd-flex', 'align-items-center', 'justify-content-center', 'div-va-table', 'col-md-2', 'themed-grid-col', 'py-2', 'beauty-link']" :to="'/voiceactor/'+voiceactor.id"> {{ voiceactor.voiceactor_name }}</router-link>
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
      path: `${import.meta.env.VITE_WEBSITE_URL}/images/skin/`,
      default: `${import.meta.env.VITE_WEBSITE_URL}/resources/image-off.svg`,
      imageLoaded: false,
      factionArray: {
            1 : "Autobot",
            2 : "Decepticon",
            3 : "Maximal",
            4 : "Predacon",
            5 : "Terrorcon"
        }
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
    },

    async checkImage() {
      try {
        await this.imageExists(this.path + this.image);
        this.imageLoaded = true;
      } catch (error) {
        this.imageLoaded = false;
      }
    },

    imageExists(imgUrl) {
      return new Promise((resolve, reject) => {
        let imageData = new Image();
        imageData.src = imgUrl;

        imageData.onload = () => {
          resolve();
        };

        imageData.onerror = () => {
          reject();
        };
      });
    }
  }
}
</script>