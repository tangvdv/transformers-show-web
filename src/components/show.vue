<template>
  <div type="button" class="poster-div card shadow-sm"  @click="redirect(id)">
      <img v-if="imageSource(image)" class="poster rounded-2" :src="imageSource(image)">
      <div class="card-body">
          <p class="card-text text-center fs-5"> {{ show_name }} </p>
      </div>
  </div>
</template>

<script>
export default {
  name: "Show",
  props: ['id', 'show_name', 'image'],
  methods: {
      imageSource(image){
        const image_uri = "/images/show/"
        try{
            return require(image_uri + image)
        } catch (error) {
            console.error("Image not found : " + image_uri + image)
            return null
        }
      },

      redirect(id){
            window.location.href = `/src/show/show.php?id=${id}`
      }
  }
}
</script>