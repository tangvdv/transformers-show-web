<template>
  <router-link :class="[ !isVisible ? 'visually-hidden' : '', 'alt-poster-div', 'card', 'shadow-sm', 'mx-4', 'p-0' ]" :to="'/alt/'+id">
      <img class="alt-poster rounded-2" :src="path + image">
      <div class="card-body">
          <p class="card-text text-center fs-5"> {{ alt_name }} </p>
      </div>
    </router-link>
</template>

<script>
export default {
  name: "AltPostCard",
  props: ['id', 'alt_name', 'image'],
  data() {
    return {
      path: `${import.meta.env.VITE_WEBSITE_URL}/images/alt/`,
      isVisible: true
    };
  }
}
</script>