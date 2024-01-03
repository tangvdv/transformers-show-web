<template>
  <router-link :class="[ !isVisible ? 'visually-hidden' : '', 'poster-div', 'card', 'shadow-sm', 'mx-4', 'p-0' ]" :to="'/bot/'+id">
      <img class="poster rounded-2" :src="path + image">
      <div class="card-body">
          <p class="card-text text-center fs-5"> {{ bot_name }} </p>
      </div>
    </router-link>
</template>

<script>
export default {
  name: "Bot",
  props: ['id', 'bot_name', 'image'],
  data() {
    return {
      path: "http://localhost:5173/images/bot/",
      isVisible: true
    };
  }
}
</script>