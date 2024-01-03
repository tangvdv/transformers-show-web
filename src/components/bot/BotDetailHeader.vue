<template>
    <div class="d-flex justify-content-center py-3">
        <p>{{ description }}</p>
        <ul class="nav nav-pills">
            <li class="nav-item d-flex px-4"><p>Faction : {{ factionArray[faction] }}</p></li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "BotDetailInfo",
  props: ['description', 'faction'],
  data(){
    return{
        factionArray: {
            1 : "Autobot",
            2 : "Decepticon",
            3 : "Maximal",
            4 : "Predacon",
            5 : "Terrorcon"
        }
    }
  }
}
</script>