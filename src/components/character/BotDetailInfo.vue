<template>
    <div class="row py-3">
      <div class="col-lg-4"></div>
      <div class="col-lg-4 text-center">
        <div class="row">
            <div>
                <h1 class="fw-light">{{ bot_name }}</h1>
                <img class="poster my-4" :src="path + image">
            </div>
        </div>
      </div>

      <div class="col-lg-4">
        <ul class="list-group list-group-horizontal">
          <li class="list-group-item fw-bold w-50">Faction</li>
          <li class="list-group-item w-25 text-center">{{ factionArray[faction] }}</li>
        </ul>
        <ul v-for="(value, key) in total_data" class="list-group list-group-horizontal">
          <li class="list-group-item fw-bold w-50">{{ key }}</li>
          <li class="list-group-item w-25 text-center">{{ value }}</li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: "BotDetailInfo",
  props: ['image', 'bot_name', 'faction', 'shows'],
  data() {
    return {
      path: `${import.meta.env.VITE_WEBSITE_URL}/images/bot/`,
      total_data: {
        "screen_time": 0,
        "voice_line": 0,
        "transformation": 0,
        "alt_transformation": 0,
        "robot_transformation": 0,
        "death_count": 0
      },
      factionArray: {
        1 : "Autobot",
        2 : "Decepticon",
        3 : "Maximal",
        4 : "Predacon",
        5 : "Terrorcon"
      }
    };
  },
  methods: {
        calculateTotalData(){
          this.shows.forEach(show => {
              show.skin.forEach(skin => {
                  this.total_data.screen_time += skin.screen_time
                  this.total_data.voice_line += skin.voice_line
                  this.total_data.transformation += skin.transformation
                  this.total_data.alt_transformation += skin.alt_transformation
                  this.total_data.robot_transformation += skin.robot_transformation
                  this.total_data.death_count += skin.death_count
              })
          })
        }
    },
    
    beforeMount() {
        this.calculateTotalData()
    }
}
</script>