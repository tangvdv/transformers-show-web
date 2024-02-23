<template>
    <ProgressCircle v-if="data == null" />
    <div v-else>
        <div v-if="isValid">
            <BotDetailInfo 
                :key="data.id"
                :bot_name="data.bot_name"
                :image="data.image"
                :faction="data.faction"
                :shows="data.show"
            />
            <hr>
            <div class="d-flex justify-content-center my-4">
                <BotDetailShowCard @skinDetailEvent="showSkinId"
                    v-for="show in data.show"
                    :key="show.id"
                    :id="show.id"
                    :show_name="show.show_name"
                    :image="show.image"
                    />
            </div>

            <BotDetailCard
                v-for="show in data.show"
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
            const res = await this.$root.$refs.RequestComponent.createApiRequest("GET", `bot/id/${id}?type=show`, {})
            this.data = res.data
            if(res.statusCode == 200){
                this.isValid = true
            }
            else{
                this.statusRequest.code = res.statusCode
                if(res.statusCode != 500){
                    this.statusRequest.message = res.data
                    this.statusRequest.redirect_url = "/bot"
                }
                this.isValid = false
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