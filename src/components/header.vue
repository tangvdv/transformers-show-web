<template>
    <header class="bg-red">
        <div class="flex justify-content-between h-100 vertical-content-center">
            <div class="ps-custom" style="--p: 44px">
                <router-link to="/" class="nav"><p class="logo-default m-0 flex justify-content-center vertical-content-center">TF SHOW</p></router-link>
            </div>
            <div>
                <ul class="vertical-content-center flex justify-content-center flex-gap nav m-0" style="--g:30px">
                    <li><router-link to="/show" class="nav-link text-light font-custom" :class="{'nav-link-active': $route.path == '/show'}" style="--f: 20px">Show</router-link></li>
                    <li><router-link to="/bot" class="nav-link text-light font-custom" :class="{'nav-link-active': $route.path == '/bot'}" style="--f: 20px">Character</router-link></li>
                    <li><router-link to="/alt" class="nav-link text-light font-custom" :class="{'nav-link-active': $route.path == '/alt'}" style="--f: 20px">Alt</router-link></li>
                    <li><router-link to="/actor" class="nav-link text-light font-custom" :class="{'nav-link-active': $route.path == '/actor'}" style="--f: 20px">Actor</router-link></li>
                    <li><router-link to="/voiceactor" class="nav-link text-light font-custom" :class="{'nav-link-active': $route.path == '/voiceactor'}" style="--f: 20px">Voice Actor</router-link></li>
                    <li><router-link to="/artefact" class="nav-link text-light font-custom" :class="{'nav-link-active': $route.path == '/artefact'}" style="--f: 20px">Artefact</router-link></li>
                    <li><router-link to="/conceptart" class="nav-link text-light font-custom" :class="{'nav-link-active': $route.path == '/conceptart'}" style="--f: 20px">Concept Art</router-link></li>
                </ul>
            </div>
            <div style="min-width: 203px; min-height: 20px;"></div>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>