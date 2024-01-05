<template>
    <ProgressCircle v-if="data == null" />
    <div v-else>
        <div v-if="isValid">
            <BotDetailInfo 
                :key="items.id"
                :bot_name="items.bot_name"
                :image="items.image"
            />
            <hr>
            <BotDetailHeader 
                :key="items.id"
                :description="items.description"
                :faction="items.faction"
            />
            <BotDetailSkin 
                :key="items.id"
                :skins="items.skins"
            />
            <hr>
            <h2 class="text-center">Alt</h2>
            <BotDetailAlt
                :key="items.id"
                :skins="items.skins"
            />
            <hr>
            <h2 class="text-center">Voice actor</h2>
            <BotDetailVoiceActor
                :key="items.id"
                :skins="items.skins"
            />
            <hr>
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
import BotDetailHeader from '@/components/bot/BotDetailHeader.vue'
import BotDetailSkin from '@/components/bot/BotDetailSkin.vue'
import BotDetailAlt from '@/components/bot/BotDetailAlt.vue'
import BotDetailVoiceActor from '@/components/bot/BotDetailVoiceActor.vue'

const uri = "http://localhost:3000/bot/id/"

export default {
    name: "BotDetail",
    components: {
    BotDetailInfo,
    BotDetailHeader,
    RedirectStatusCode,
    ProgressCircle,
    BotDetailSkin,
    BotDetailAlt,
    BotDetailVoiceActor
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
                const response = await fetch(uri+id, {
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