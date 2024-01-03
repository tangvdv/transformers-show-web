<template>
    <InputSearchPost @filterEvent="filterPosts" />
    <div v-if="items" class="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-5 g-3 py-4" id="show-container">            
        <ShowPostCard
            ref="showComponent"
            v-for="item in items"
            :key="item.id"
            :id="item.id"
            :show_name="item.show_name"
            :image="item.image"
        />
    </div>
</template>

<script>
import InputSearchPost from '@/components/InputSearchPost.vue'
import ShowPostCard from '@/components/show/ShowPostCard.vue'

const uri = "http://localhost:3000/show"

export default {
    name: "ShowPost",
    components: {
    ShowPostCard,
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
            this.$refs.showComponent.forEach(show => {
                show.isVisible = show.show_name.toLowerCase().includes(text.toLowerCase())
            })
        }
    },

    beforeMount() {
        this.fetchData()
    }
}
</script>