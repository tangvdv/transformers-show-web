<template>
    <div v-if="isValid">
        <BotInfo 
            :key="items.id"
            :bot_name="items.bot_name"
            :image="items.image"
        />
        <BotHeader 
            :key="items.id"
            :description="items.description"
            :faction="items.faction"
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
import RedirectStatusCode from '/src/views/RedirectStatusCode.vue'
import BotInfo from '/src/components/bot/BotInfo.vue'
import BotHeader from '/src/components/bot/BotHeader.vue'

const uri = "http://localhost:3000/bot/id/"

export default {
    name: "BotDetail",
    components: {
    BotInfo,
    BotHeader,
    RedirectStatusCode
},
    data() {
        return {
            items: [],
            isValid: false,
            statusRequest: {
                "code": "",
                "message": "",
                "redirect_url": "/bot"
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