<template>
    <ProgressCircle v-if="data == null" />
    <div v-else>
        <div v-if="isValid">
            <VoiceActorDetailInfo 
                :key="items.id"
                :voiceactor_name="items.voiceactor_name"
                :image="items.image"
            />
            <VoiceActorDetailHeader 
                :key="items.id"
                :origin="items.origin"
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
                const response = await fetch(`${import.meta.env.VITE_API_URL}/voiceactor/id/${id}`, {
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
                        this.statusRequest.redirect_url = "/voiceactor"
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
            this.statusRequest.redirect_url = "/voiceactor"
        }
    }
}
</script>