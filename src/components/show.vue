<template>
  <div type="button" class="poster-div card shadow-sm"  @click="redirect(id)">
      <img class="poster rounded-2" :src="path + image">
      <div class="card-body">
          <p class="card-text text-center fs-5"> {{ show_name }} </p>
      </div>
  </div>
</template>

<script>
export default {
  name: "Show",
  props: ['id', 'show_name', 'image'],
  data() {
    return {
      path: "http://localhost:5173/images/show/",
    };
  },
  methods: {
      redirect(id){
            window.location.href = `/src/show/show.php?id=${id}`
      }
  }
}
</script>