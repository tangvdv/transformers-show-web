<template>
    <header class="d-flex justify-content-center py-3 app-bg-color-red">
        <router-link to="/" class="mb-3 nav-link text-light border rounded-1">
            <span class="fs-4 mx-2"><b>TF Show</b></span>
        </router-link>
        <ul class="nav nav-pills">
            <li class="nav-item"><router-link to="/show" class="nav-link text-light">Show</router-link></li>
            <li class="nav-item"><router-link to="/bot" class="nav-link text-light">Bot</router-link></li>
            <li class="nav-item"><router-link to="/alt" class="nav-link text-light">Alt</router-link></li>
            <li class="nav-item"><router-link to="/actor" class="nav-link text-light">Actor</router-link></li>
            <li class="nav-item"><router-link to="/voiceactor" class="nav-link text-light">Voice actor</router-link></li>
        </ul>
    </header>
</template>