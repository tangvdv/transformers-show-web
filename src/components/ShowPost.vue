<template>
    <div v-if="items" class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3 py-4" id="show-container">            
        <Show 
            v-for="item in items"
            :id="item.id"
            :show_name="item.show_name"
            :image="item.image"
        />
    </div>
</template>

<script>
import Show from './show.vue'

export default {
    name: "ShowPost",
    components: {
        Show
    }, 
    data() {
        return {
            props: [ {id:"", show_name:"test", image:"es"} ],
            items: []
        }
    },

    methods: {
        fetchData(){
            fetch('http://localhost:3000/show', {
                method: "GET"
            })
            .then((response) => {
            response.json().then((data) => {
                this.items = data
            })
            })
            .catch((err) => {
            console.error(err)
            })
        },

        async fetchDataAwait(){
            try{
                const response = await fetch('http://localhost:3000/show', {
                    method: 'GET'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                this.items = data.data;
            }
            catch (err){
                console.error(err)
            }
        }
    },

    beforeMount() {
        this.fetchDataAwait()
    }
}
</script>