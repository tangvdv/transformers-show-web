<template>
    <ProgressCircle v-if="data == null" />
    <div v-else>
        <div v-if="isValid">
            <ActorDetailInfo 
                :key="data.id"
                :actor_name="data.actor_name"
                :image="data.image"
            />
            <ActorDetailHeader 
                :key="data.id"
                :character="data.character"
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
import ActorDetailInfo from '@/components/actor/ActorDetailInfo.vue'
import ActorDetailHeader from '@/components/actor/ActorDetailHeader.vue'

export default {
    name: "ActorDetail",
    components: {
    ActorDetailInfo,
    ActorDetailHeader,
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
            const res = await this.$root.$refs.RequestComponent.createApiRequest("GET", `actor/id/${id}`, {})
            this.data = res.data
            if(res.statusCode == 200){
                this.isValid = true
            }
            else{
                this.statusRequest.code = res.statusCode
                if(res.statusCode != 500){
                    this.statusRequest.message = res.data
                    this.statusRequest.redirect_url = "/actor"
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
            this.statusRequest.redirect_url = "/actor"
        }
    }
}
</script>