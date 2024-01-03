<template>
    <div v-if="code" class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column text-center">
        <h1>{{ code }}</h1>
        <p class="lead">{{ message }}</p>
        <p class="lead">
            <router-link :to="redirect_url" class="btn btn-outline-dark fw-bold">Home page</router-link>
        </p>
    </div>
</template>

<script>

export default {
    name: "RedirectStatusCode",
    props: ['code', 'message', 'redirect_url']
}

</script>