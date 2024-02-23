<template>
    <ProgressCircle v-if="data == null" />
    <div v-else>
        <div v-if="isValid">
            <InputSearchPost @filterEvent="filterPosts" />
            <div class="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-5 g-3 py-4" id="show-container">            
                <VoiceActorPostCard
                    ref="voiceactorComponent"
                    v-for="item in data"
                    :key="item.id"
                    :id="item.id"
                    :voiceactor_name="item.voiceactor_name"
                    :image="item.image"
                />
            </div>
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
import InputSearchPost from '@/components/InputSearchPost.vue'
import VoiceActorPostCard from '@/components/voiceactor/VoiceActorPostCard.vue'

export default {
    name: "VoiceActorPost",
    components: {
    VoiceActorPostCard,
    InputSearchPost,
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
        async fetchData(){
            const res = await this.$root.$refs.RequestComponent.createApiRequest("GET", `voiceactor`, {})
            this.data = res.data
            if(res.statusCode == 200){
                this.isValid = true
            }
            else{
                this.statusRequest.code = res.statusCode
                if(res.statusCode != 500){
                    this.statusRequest.message = res.data
                }
                this.isValid = false
            }
        },

        filterPosts(text){
            this.$refs.voiceactorComponent.forEach(voiceactor => {
                voiceactor.isVisible = voiceactor.voiceactor_name.toLowerCase().includes(text.toLowerCase())
            })
        }
    },

    beforeMount() {
        this.fetchData()
    }
}
</script>