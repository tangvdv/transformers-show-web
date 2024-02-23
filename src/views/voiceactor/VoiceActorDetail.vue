<template>
    <ProgressCircle v-if="data == null" />
    <div v-else>
        <div v-if="isValid">
            <VoiceActorDetailInfo 
                :key="data.id"
                :voiceactor_name="data.voiceactor_name"
                :image="data.image"
            />
            <VoiceActorDetailHeader 
                :key="data.id"
                :origin="data.origin"
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
import VoiceActorDetailInfo from '@/components/voiceactor/VoiceActorDetailInfo.vue'
import VoiceActorDetailHeader from '@/components/voiceactor/VoiceActorDetailHeader.vue'

export default {
    name: "ActorDetail",
    components: {
    VoiceActorDetailInfo,
    VoiceActorDetailHeader,
    RedirectStatusCode,
    ProgressCircle
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
            const res = await this.$root.$refs.RequestComponent.createApiRequest("GET", `voiceactor/id/${id}`, {})
            this.data = res.data
            if(res.statusCode == 200){
                this.isValid = true
            }
            else{
                this.statusRequest.code = res.statusCode
                if(res.statusCode != 500){
                    this.statusRequest.message = res.data
                    this.statusRequest.redirect_url = "/voiceactor"
                }
                this.isValid = false
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
            this.statusRequest.redirect_url = "/voiceactor"
        }
    }
}
</script>