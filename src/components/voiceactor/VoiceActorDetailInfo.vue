<template>
    <div class="py-3 text-center">
        <div class="row">
            <div class="col-lg-6 col-md-8 mx-auto">
                <h1 class="fw-light">{{ voiceactor_name }}</h1>
                <img class="actor-poster-regular my-4" :src="path + image">
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
export default {
  name: "VoiceActorDetailInfo",
  props: ['voiceactor_name', 'image'],
  data() {
    return {
      path: "http://localhost:5173/images/voiceactor/"
    };
  }
}
</script>