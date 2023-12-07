<script>
export default {
  data() {
    return {
      image_uri: "/images/show/",
      items: []
    }
  },

  methods: {
    fetchData(){
      fetch('http://localhost:3000/show', {
        method: "GET"
      })
        .then((response) => {
          response.json().then((data) => {
            this.items = data
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },

    imageSource(image){
      try{
        return require(this.image_uri + image)
      } catch (error) {
        console.log("Image not found : " + this.image_uri + image)
        return null
      }
    },

    redirect(id){
      window.location.href = `/src/show/show.php?id=${id}`
    }
  },

  created() {
    this.fetchData()
  }
}
</script>

<template>
  <div v-if="items" class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3 py-4">
    <div v-for="item in items.data" type="button" class="poster-div card shadow-sm"  @click="redirect(item.id)">
      {{ item.image }}
      <img v-if="imageSource(item.image)" class="poster rounded-2" :src="imageSource(item.image)">
      <div class="card-body">
          <p class="card-text text-center fs-5"> {{ item.show_name }} </p>
      </div>
    </div>
  </div>
</template>