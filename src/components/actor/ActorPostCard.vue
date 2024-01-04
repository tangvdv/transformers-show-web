<template>
  <router-link :class="[ !isVisible ? 'visually-hidden' : '', 'actor-poster-div-regular', 'card', 'shadow-sm', 'mx-4', 'p-0' ]" :to="'/actor/'+id">
      <img class="actor-poster-regular rounded-2" :src="path + image">
      <div class="card-body">
          <p class="card-text text-center fs-5"> {{ actor_name }} </p>
      </div>
    </router-link>
</template>

<script>
export default {
  name: "ActorPostCard",
  props: ['id', 'actor_name', 'image'],
  data() {
    return {
      path: "http://localhost:5173/images/actor/",
      isVisible: true
    };
  }
}
</script>