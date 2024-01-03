<template>
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
</template>

<script>
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
        RedirectStatusCode
    },
    data() {
        return {
            items: [],
            isValid: false,
            statusRequest: {
                "code": "",
                "message": "",
                "redirect_url": "/show"
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
                    this.statusRequest.message = data.data
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