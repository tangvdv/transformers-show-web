<template>
    <div class="shadow-sm mx-4">
        <img v-if="imageLoaded" class="skin-poster rounded-2" :src="path + image">
        <div v-else class="default-poster bg-default rounded-2">
          <img class="image-center" :src="default">
        </div>
    </div>
</template>

<script>
export default {
  name: "BotDetailCardSkin",
  props: ['image'],
  data() {
    return {
      path: `${import.meta.env.VITE_WEBSITE_URL}/images/skin/`,
      default: `${import.meta.env.VITE_WEBSITE_URL}/resources/image-off.svg`,
      imageLoaded: false
    };
  },
  methods: {
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
  },
  mounted() {
    this.checkImage();
  }
}
</script>

<style>
.bg-default{
  background: white;
}

.skin-poster{
  width: auto;
  height: 18em;
}

.default-poster{
  width: 12em;
  height: 18em;
}

.image-center{
  margin: auto;
  padding-top: 50%;
  padding-bottom: 50%;
  display: block;
}

</style>