<template>
    <ProgressCircle v-if="data == null" />
    <div v-else>
        <div v-if="isValid">
            <AltDetailInfo 
                :key="data.id"
                :alt_name="data.alt_name"
                :image="data.image"
            />
            <AltDetailHeader 
                :key="data.id"
                :description="data.description"
                :brand="data.brand"
                :model_year="data.model_year"
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
import AltDetailInfo from '@/components/alt/AltDetailInfo.vue'
import AltDetailHeader from '@/components/alt/AltDetailHeader.vue'

export default {
    name: "AltDetail",
    components: {
    AltDetailInfo,
    AltDetailHeader,
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
            const res = await this.$root.$refs.RequestComponent.createApiRequest("GET", `alt/id/${id}`, {})
            this.data = res.data
            if(res.statusCode == 200){
                this.isValid = true
            }
            else{
                this.statusRequest.code = res.statusCode
                if(res.statusCode != 500){
                    this.statusRequest.message = res.data
                    this.statusRequest.redirect_url = "/alt"
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
            this.statusRequest.redirect_url = "/alt"
        }
    }
}
</script>