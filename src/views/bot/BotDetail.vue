<template>
    <ProgressCircle v-if="data == null" />
    <div v-else>
        <div v-if="isValid">
            <BotDetailInfo 
                :key="items.id"
                :bot_name="items.bot_name"
                :image="items.image"
                :faction="items.faction"
                :shows="items.show"
            />
            <hr>
            <div class="d-flex justify-content-center my-4">
                <BotDetailShowCard @skinDetailEvent="showSkinId"
                    v-for="show in items.show"
                    :key="show.id"
                    :id="show.id"
                    :show_name="show.show_name"
                    :image="show.image"
                    />
            </div>

            <BotDetailCard
                v-for="show in items.show"
                ref="SkinDetailCardComponent"
                :key="show.id"
                :id="show.id"
                :show="show"
                />
        </div>
        <div v-else>
            <RedirectStatusCode
                :code="statusRequest.code"
                :message="statusRequest.message"
                :redirect_url="statusRequest.redirect_url"
            />
        </div>
    </div>
</template>

<script>
import ProgressCircle from '@/components/ProgressCircle.vue'
import RedirectStatusCode from '@/views/RedirectStatusCode.vue'
import BotDetailInfo from '@/components/bot/BotDetailInfo.vue'
import BotDetailSkin from '@/components/bot/BotDetailSkin.vue'
import BotDetailCard from '@/components/bot/BotDetailCard.vue'
import BotDetailShowCard from '@/components/bot/BotDetailShowCard.vue'

export default {
    name: "BotDetail",
    components: {
    BotDetailInfo,
    RedirectStatusCode,
    ProgressCircle,
    BotDetailSkin,
    BotDetailCard,
    BotDetailShowCard
},
    data() {
        return {
            data: null,
            items: [],
            isValid: false,
            statusRequest: {
                "code": "",
                "message": "",
                "redirect_url": "/"
            }
        }
    },

    methods: {
        async fetchData(id){
            try{
                const response = await fetch(`${import.meta.env.VITE_API_URL}/bot/id/${id}?type=show`, {
                    method: 'GET'
                });

                this.data = await response.json();
                if(this.data.statusCode == 200){
                    this.items = this.data.data;
                    this.isValid = true
                }
                else{
                    this.statusRequest.code = this.data.statusCode
                    if(this.data.statusCode != 500){
                        this.statusRequest.message = this.data.data
                        this.statusRequest.redirect_url = "/bot"
                    }
                }
            }
            catch (err){
                console.error(err)
            }
        },

        showSkinId(id){
            this.$refs.SkinDetailCardComponent.forEach(skin => {
                skin.isVisible = skin.id == id
            })
        }
    },

    beforeMount(){
        var id = this.$route.params.id
        if(parseInt(id)){
            this.fetchData(id);
        }
        else{
            this.statusRequest.code = "404"
            this.statusRequest.message = "Wrong parameter type"
            this.statusRequest.redirect_url = "/bot"
        }
    }
}
</script>