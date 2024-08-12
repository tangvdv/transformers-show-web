<template>
    <ProgressCircle v-if="!isFetched" />
    <div v-else>
        <div v-if="isValid">
            <InputSearchPost @filterEvent="filterPosts" />
            <div class="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-5 g-3 py-4" id="show-container">            
                <ShowPostCard
                    ref="showComponent"
                    v-for="item in data"
                    :key="item.id"
                    :id="item.id"
                    :show_name="item.show_name"
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
import axios from 'axios'

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
            //this.data = await this.$root.$refs.RequestComponent.createApiRequest("GET", `users`, {})
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`);
            this.data = response.data;
            if(this.data != null) this.isFetched = true;

            if(this.statusCode == 200){
                this.isValid = true
                console.log(this.data);
            }
            else{
                this.statusRequest.code = this.data.statusCode
                this.statusRequest.message = this.data.message
                this.isValid = false
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