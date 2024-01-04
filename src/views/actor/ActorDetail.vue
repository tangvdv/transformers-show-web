<template>
    <div v-if="isValid">
        <ActorDetailInfo 
            :key="items.id"
            :actor_name="items.actor_name"
            :image="items.image"
        />
        <ActorDetailHeader 
            :key="items.id"
            :character="items.character"
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
import ActorDetailInfo from '@/components/actor/ActorDetailInfo.vue'
import ActorDetailHeader from '@/components/actor/ActorDetailHeader.vue'

const uri = "http://localhost:3000/actor/id/"

export default {
    name: "ActorDetail",
    components: {
    ActorDetailInfo,
    ActorDetailHeader,
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
                        this.statusRequest.redirect_url = "/actor"
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
        }
    }
}
</script>