<template>
  <router-link :class="[ !isVisible ? 'visually-hidden' : '', 'poster-div', 'card', 'shadow-sm', 'mx-4', 'p-0' ]" :to="'/show/'+id">
      <img class="poster rounded-2" :src="path + image">
      <div class="card-body">
          <p class="card-text text-center fs-5"> {{ show_name }} </p>
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
      isVisible: true
    };
  }
}
</script>