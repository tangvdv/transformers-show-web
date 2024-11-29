<template>
  <div>
    <div class="homepage-button-bg">
        <router-link :to="route">
            <div class="homepage-button-image flex justify-content-center">
                <img v-if="imageLoaded" class="homepage-button-image" :src="image" />
                <div class="homepage-button-title text-light">{{ title }}</div>
            </div>
        </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePageButton",
  props: ['title', 'image', 'route'],
  data() {
    return {
        imageLoaded: false,
    }
  },
  methods: {
    async checkImage() {
      try {
        await this.imageExists(this.image);
        this.imageLoaded = true;
        console.log("good");
        
      } catch (error) {
        this.imageLoaded = false;
      }
    },
    imageExists(imgUrl) {
      return new Promise((resolve, reject) => {
        let imageData = new Image();
        imageData.src = imgUrl;
        console.log(imgUrl);

        imageData.onload = () => {
          resolve();
        };

        imageData.onerror = () => {
          reject();
        };
      });
    }
  },
  beforeMount() {
    this.checkImage();
  }
}
</script>