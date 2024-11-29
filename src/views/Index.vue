<template>
    <div class="mt-custom" style="--m:39px">
        <div class="flex justify-content-center align-content-around flex-gap" style="--g:25px;">
            <HomePageButton :title="'SHOW'"         :image="path + 'tfshow_btn_show.png'"       :route="'/show'"/>
            <HomePageButton :title="'CHARACTER'"    :image="path + 'tfshow_btn_character.png'"  :route="'/character'"/>
            <HomePageButton :title="'ALT'"          :image="path + 'tfshow_btn_alt.png'"        :route="'/alt'"/>
            <HomePageButton :title="'ACTOR'"        :image="path + 'tfshow_btn_actor.png'"      :route="'/actor'"/>
            <HomePageButton :title="'VOICE ACTOR'"  :image="path + 'tfshow_btn_voiceactor.png'" :route="'/voiceactor'"/>
            <HomePageButton :title="'ARTEFACT'"     :image="path + 'tfshow_btn_artefact.png'"   :route="'/artefact'"/>
            <HomePageButton :title="'CONCEPT ART'"  :image="path + 'tfshow_btn_conceptart.png'" :route="'/conceptart'"/>
        </div>
    </div>
</template>

<script>
import HomePageButton from '@/components/HomePageButton.vue'

export default {
    name: "Index",
    components: {
        HomePageButton,
    },
    data() {
        return {
            path: `${import.meta.env.VITE_WEBSITE_URL}/src/assets/images/`
        };
    },
}
</script>