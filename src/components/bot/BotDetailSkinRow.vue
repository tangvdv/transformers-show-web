<template>
    <tr v-for="skin in show.skin" class="mx-2 text-center td-vertical-center">
        <td>
            <router-link :to="'/show/'+show.id" class="col">
                <div class="themed-grid-col"><img :src="path + show.image" class="table-poster"></div>
                <div class="themed-grid-col">{{ show.show_name }}</div>
            </router-link>
        </td>
        <td>{{ skin.screen_time }}</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
    </tr>
</template>

<script>

export default {
  name: "ShowDetailRow",
  props: ['show'],
  data() {
    return {
      path: `${import.meta.env.VITE_WEBSITE_URL}/images/show/`
    };
  }
}
</script>

<style>
.td-vertical-center{
    vertical-align: middle;
}
</style>