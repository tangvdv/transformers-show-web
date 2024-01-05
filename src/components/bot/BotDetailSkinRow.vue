<template>
    <tr class="mx-2 text-center td-vertical-center">
        <td>
            <router-link :to="'/show/'+show.id" class="col">
                <div class="themed-grid-col"><img :src="path + show.image" class="table-poster"></div>
                <div class="themed-grid-col">{{ show.show_name }}</div>
            </router-link>
        </td>
        <td>{{ screen_time }}</td>
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
  props: ['show', 'screen_time'],
  data() {
    return {
      path: "http://localhost:5173/images/show/"
    };
  }
}
</script>

<style>
.td-vertical-center{
    vertical-align: middle;
}
</style>