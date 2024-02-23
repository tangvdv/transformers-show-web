<template>
    <ProgressCircle v-if="data == null" />
    <div v-else>
        <div v-if="isValid">
            <ShowDetailInfo 
                :key="data.id"
                :show_name="data.show_name"
                :image="data.image"
            />
            <ShowDetailHeader 
                :key="data.id"
                :description="data.description"
                :release_date="data.release_date"
                :producer="data.producer"
                :director="data.director"
            />
            <ShowDetailData
                :key="data.id"
                :skins="data.skin"
                :actors="data.actor"
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
import ShowDetailInfo from '@/components/show/ShowDetailInfo.vue'
import ShowDetailHeader from '@/components/show/ShowDetailHeader.vue'
import ShowDetailData from '@/components/show/ShowDetailData.vue'

export default {
    name: "ShowDetail",
    components: {
        ShowDetailInfo,
        ShowDetailHeader,
        ShowDetailData,
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
            const res = await this.$root.$refs.RequestComponent.createApiRequest("GET", `show/id/${id}`, {})
            this.data = res.data
            if(res.statusCode == 200){
                this.isValid = true
            }
            else{
                this.statusRequest.code = res.statusCode
                if(res.statusCode != 500){
                    this.statusRequest.message = res.data
                    this.statusRequest.redirect_url = "/show"
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
            this.statusRequest.redirect_url = "/show"
        }
    }
}
</script>