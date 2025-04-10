<template>
  <router-link :class="[ !isVisible ? 'visually-hidden' : '', 'nav' ]" :to="'/show/'+id">
    <div ref="card" class="show-card shadow flex column justify-content-between">
      <img ref="cardImage" :src="path + image">
      <div class="flex-grow flex column justify-content-center">
          <p ref="cardTitle" :style="`font-size: ${fontSize}px`" class="show-card-title">{{ show_name }} </p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "ShowPostCard",
  props: ['id', 'show_name', 'image'],
  data() {
    return {
      path: `${import.meta.env.VITE_WEBSITE_URL}/images/show/`,
      isVisible: true,
      fontSize: 16
    };
  },
  methods: {

    resize(computedStyle, desired_height){
      if(parseFloat(computedStyle.height) > desired_height){
        this.fontSize = this.fontSize - 1;
        this.$nextTick(() => {
          this.resize(
            window.getComputedStyle(this.$refs.cardTitle), 
            desired_height
          )
        })
      }
    }
  },
  mounted() {
    var desired_height = this.$refs.card.clientHeight - this.$refs.cardImage.clientHeight;
    var computedStyle = window.getComputedStyle(this.$refs.cardTitle);

    this.resize(computedStyle, desired_height);
  }
}
</script>