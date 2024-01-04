<template>
    <div class="d-flex justify-content-center py-3">
        <ul class="nav nav-pills">
            <li class="nav-item d-flex px-4"><p>Origin : {{ originArray[origin] }}</p></li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "VoiceActorDetailInfo",
  props: ['origin'],
  data(){
    return{
        originArray: {
            1 : "American",
            2 : "English",
            3 : "Japanese",
            4 : "German",
            5 : "Spanish",
            6 : "French"
        }
    }
  }
}
</script>