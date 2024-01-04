<template>
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
</template>

<script>
import RedirectStatusCode from '@/views/RedirectStatusCode.vue'
import AltDetailInfo from '@/components/alt/AltDetailInfo.vue'
import AltDetailHeader from '@/components/alt/AltDetailHeader.vue'

const uri = "http://localhost:3000/alt/id/"

export default {
    name: "AltDetail",
    components: {
    AltDetailInfo,
    AltDetailHeader,
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
        }
    }
}
</script>