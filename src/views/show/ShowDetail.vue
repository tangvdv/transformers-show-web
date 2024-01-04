<template>
    <ProgressCircle v-if="data == null" />
    <div v-else>
        <div v-if="isValid">
            <ShowDetailInfo 
                :key="items.id"
                :show_name="items.show_name"
                :image="items.image"
            />
            <ShowDetailHeader 
                :key="items.id"
                :description="items.description"
                :release_date="items.release_date"
                :producer="items.producer"
                :director="items.director"
            />
            <ShowDetailData
                :key="items.id"
                :skins="items.skin"
                :actors="items.actor"
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

const uri = "http://localhost:3000/show/id/"

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
                        this.statusRequest.redirect_url = "/show"
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
            this.statusRequest.redirect_url = "/show"
        }
    }
}
</script>