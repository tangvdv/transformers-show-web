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
  name: "ShowDetailInfo",
  props: ['show_name', 'image'],
  data() {
    return {
      path: `${import.meta.env.VITE_WEBSITE_URL}/images/show/`
    };
  }
}
</script>