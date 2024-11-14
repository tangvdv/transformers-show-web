<template></template>
<script>
export default {
    name: "Request",
    data() {
        return {
            data: null
        }
    },
    methods: {
        async createApiRequest(method, route, params){
            try{
                const requestOptions = {
                    method: method,
                    headers: { "Content-Type": "application/json" }
                }

                if(params && Object.keys(params).length > 0){
                    requestOptions["body"] = JSON.stringify(params)
                }
                
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${route}`, requestOptions)
                
                this.data = await response.json();

                if(this.data) return this.data
            }
            catch (err){
                console.error(err)
            }
        }
    }
}
</script>