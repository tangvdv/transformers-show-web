<template>
    <div class="border rounded">
        <h2 class="text-center my-2">{{ show_name }}</h2>
        <div v-if="skins != null" class="bg-dark p-4 text-white">
            <div v-for="skin in skins" class="d-flex justify-content-center">
                <BotDetailCardSkin
                    :key="skin.id"
                    :image="skin.image"
                />
                <BotDetailCardAlt
                    :key="skin.id"
                    :alt="skin.alt"
                />
            </div>
            <hr>
            <h4 class="mx-4 p-2">Voice actor</h4>
            <div v-for="skin in skins" class="d-flex">
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

    export default {
        name: "BotDetailCard",
        props: ["show_name", "skins"],
        components: {
            BotDetailCardAlt,
            BotDetailCardSkin,
            BotDetailCardVoiceActor
        }
    }

</script>