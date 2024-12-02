<template>
    <ProgressCircle v-if="!isFetched" />
    <div v-else>
        <div v-if="isValid">
            <div class="m-custom flex justify-content-center" style="--m: 30px">
                <InputSearchPost @filterEvent="filterPosts" />
            </div>
            <div class="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-5 g-3 py-4" id="show-container">            
                <ShowPostCard
                    ref="showComponent"
                    v-for="item in data"
                    :key="item.id"
                    :id="item.id"
                    :show_name="item.name"
                    :image="item.image"
                />
            </div>
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
import InputSearchPost from '@/components/InputSearchPost.vue'
import ShowPostCard from '@/components/show/ShowPostCard.vue'

export default {
    name: "ShowPost",
    components: {
    ShowPostCard,
    InputSearchPost,
    RedirectStatusCode,
    ProgressCircle
}, 
    data() {
        return {
            data: null,
            isValid: false,
            isFetched: false,
            isFetching: false,
            statusRequest: {
                "code": "",
                "message": "",
                "redirect_url": "/"
            }
        }
    },
    methods: {
        async fetchData(){
            const res = await this.$root.$refs.RequestComponent.createApiRequest("GET", `shows`, {})
            
            if(res == null) return;
            else this.isFetched = true            

            if(res.code === 200){
                this.isValid = true
                this.data = res.items
            }
            else{
                this.isValid = false
                this.statusRequest.code = res.code
                this.statusRequest.message = res.message
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