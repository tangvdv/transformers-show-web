<template>
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
</template>

<script>
import RedirectStatusCode from '@/views/RedirectStatusCode.vue'
import VoiceActorDetailInfo from '@/components/voiceactor/VoiceActorDetailInfo.vue'
import VoiceActorDetailHeader from '@/components/voiceactor/VoiceActorDetailHeader.vue'

const uri = "http://localhost:3000/voiceactor/id/"

export default {
    name: "ActorDetail",
    components: {
    VoiceActorDetailInfo,
    VoiceActorDetailHeader,
    RedirectStatusCode
},
    data() {
        return {
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

                const data = await response.json();
                if(data.statusCode == 200){
                    this.items = data.data;
                    this.isValid = true
                }
                else{
                    this.statusRequest.code = data.statusCode
                    if(data.statusCode != 500){
                        this.statusRequest.message = data.data
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