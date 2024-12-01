<template>
  <div class="flex justify-content-center">
    <img :src="path" class="loading-circle" alt="Loading" />
  </div>
</template>

<script>
export default {
  name: "ProgressCircle",
  data() {
    return {
      path: `${import.meta.env.VITE_WEBSITE_URL}/src/assets/loading-loop.svg`
    };
  }
}
</script>

<style>
  .img-size{
    width : 5%;
    height : 5%;
  }

  .center{
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    margin: auto;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
</style>