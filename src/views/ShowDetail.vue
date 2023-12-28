<template>
    <div v-if="isEmpty">
        <ShowInfo 
            :key="items.id"
            :show_name="items.show_name"
            :image="items.image"
        />
        <ShowHeader 
            :key="items.id"
            :description="items.description"
            :release_date="items.release_date"
            :producer="items.producer"
            :director="items.director"
        />
        <ShowData
            :key="items.id"
            :skin="items.skin"
            :actor="items.actor"
        />
    </div>
</template>

<script>
import ShowInfo from '/src/components/show/ShowInfo.vue'
import ShowHeader from '/src/components/show/ShowHeader.vue'
import ShowData from '/src/components/show/ShowData.vue'
const uri = "http://localhost:3000/show/id/"

export default {
    name: "ShowDetail",
    components: {
        ShowInfo,
        ShowHeader,
        ShowData
    },
    data() {
        return {
            items: []
        }
    },

    computed:{
        isEmpty: function () {
            return this.items.length != 0
        }
    },

    methods: {
        async fetchData(id){
            try{
                const response = await fetch(uri+id, {
                    method: 'GET'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                if(data.statusCode == 200){
                    this.items = data.data;
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
    }
}
</script>