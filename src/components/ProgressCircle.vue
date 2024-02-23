<template>
  <div class="d-flex row justify-content-center center">
    <img :src="path" class="img-size" alt="Loading" />
  </div>
</template>

<script>
export default {
  name: "ProgressCircle",
  data() {
    return {
      path: `${import.meta.env.VITE_WEBSITE_URL}/resources/loading-circle.gif`
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