<template>
    <div class="py-3 text-center">
        <div class="row">
            <div class="col-lg-6 col-md-8 mx-auto">
                <h1 class="fw-light">{{ show_name }}</h1>
                <img class="poster my-4" :src="path + image">
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
export default {
  name: "ShowInfo",
  props: ['show_name', 'image'],
  data() {
    return {
      path: "http://localhost:5173/images/show/"
    };
  },
  methods: {
      redirect(id){
            window.location.href = `/src/show/show.html?id=${id}`
      }
  }
}
</script>