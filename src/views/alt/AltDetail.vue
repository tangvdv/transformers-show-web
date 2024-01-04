<template>
    <ProgressCircle v-if="data == null" />
    <div v-else>
        <div v-if="isValid">
            <AltDetailInfo 
                :key="items.id"
                :alt_name="items.alt_name"
                :image="items.image"
            />
            <AltDetailHeader 
                :key="items.id"
                :description="items.description"
                :brand="items.brand"
                :model_year="items.model_year"
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

const uri = "http://localhost:3000/alt/id/"

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
                        this.statusRequest.redirect_url = "/alt"
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
            this.statusRequest.redirect_url = "/alt"
        }
    }
}
</script>