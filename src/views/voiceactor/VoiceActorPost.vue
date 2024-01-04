<template>
    <div v-if="isValid">
        <InputSearchPost @filterEvent="filterPosts" />
        <div v-if="items" class="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-5 g-3 py-4" id="show-container">            
            <VoiceActorPostCard
                ref="voiceactorComponent"
                v-for="item in items"
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
</template>

<script>
import RedirectStatusCode from '@/views/RedirectStatusCode.vue'
import InputSearchPost from '@/components/InputSearchPost.vue'
import VoiceActorPostCard from '@/components/voiceactor/VoiceActorPostCard.vue'

const uri = "http://localhost:3000/voiceactor"

export default {
    name: "VoiceActorPost",
    components: {
    VoiceActorPostCard,
    InputSearchPost,
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
        async fetchData(){
            try{
                const response = await fetch(uri, {
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
                    }
                }
            }
            catch (err){
                console.error(err)
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