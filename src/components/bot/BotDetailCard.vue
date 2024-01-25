<template>
    <div :class="[ !isVisible ? 'visually-hidden' : '', 'border', 'rounded']">
        <h2 class="text-center my-2">{{ show.show_name }}</h2>
        <div v-if="show != null" class="bg-dark p-4 text-white">
            <div v-for="skin in show.skin" class="border rounded mx-4">
                <div class="d-flex justify-content-evenly p-2">
                    <div class="d-flex justify-content-center">
                        <BotDetailCardSkin
                            :key="skin.id"
                            :image="skin.image"
                        />
                        <BotDetailCardAlt
                            :key="skin.id"
                            :alt="skin.alt"
                        />
                    </div>
                    <div>
                        <BotDetailSkinInfo 
                            :key="skin.id"
                            :skin="skin"
                        />
                    </div>
                </div>

                <BotDetailSkin 
                    :key="show.id"
                    :show="show"
                />
            </div>

            <hr>
            <h4 class="mx-4 p-2">Voice actor</h4>
            <div v-for="skin in show.skin" class="d-flex">
                <BotDetailCardVoiceActor
                    v-for="voiceactor in skin.voiceactor"
                    :key="voiceactor.id"
                    :voiceactor="voiceactor"
                />
                <br>
            </div>
        </div>
    </div>
    <br>
</template>

<script>
    import BotDetailCardAlt from '@/components/bot/BotDetailCardAlt.vue';
    import BotDetailCardSkin from '@/components/bot/BotDetailCardSkin.vue';
    import BotDetailCardVoiceActor from '@/components/bot/BotDetailCardVoiceActor.vue';
    import BotDetailSkin from '@/components/bot/BotDetailSkin.vue';
    import BotDetailSkinInfo from '@/components/bot/BotDetailSkinInfo.vue'

    export default {
        name: "BotDetailCard",
        props: ["id", "show"],
        components: {
            BotDetailCardAlt,
            BotDetailCardSkin,
            BotDetailCardVoiceActor,
            BotDetailSkin,
            BotDetailSkinInfo
        },
        data() {
            return {
                isVisible: false
            };
        }
    }

</script>