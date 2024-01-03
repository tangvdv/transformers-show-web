<template>
    <InputSearchPost @filterEvent="filterPosts" />
    <div v-if="items" class="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-5 g-3 py-4" id="show-container">            
        <BotPostCard
            ref="botComponent"
            v-for="item in items"
            :key="item.id"
            :id="item.id"
            :bot_name="item.bot_name"
            :image="item.image"
        />
    </div>
</template>

<script>
import InputSearchPost from '@/components/InputSearchPost.vue'
import BotPostCard from '@/components/bot/BotPostCard.vue'

const uri = "http://localhost:3000/bot"

export default {
    name: "BotPost",
    components: {
    BotPostCard,
    InputSearchPost
}, 
    data() {
        return {
            items: []
        }
    },
    methods: {
        async fetchData(){
            try{
                const response = await fetch(uri, {
                    method: 'GET'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const data = await response.json()
                this.items = data.data
            }
            catch (err){
                console.error(err)
            }
        },

        filterPosts(text){
            this.$refs.botComponent.forEach(bot => {
                bot.isVisible = bot.bot_name.toLowerCase().includes(text.toLowerCase())
            })
        }
    },

    beforeMount() {
        this.fetchData()
    }
}
</script>