<template>
    <div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item bg-dark text-light d-flex">
                <p class="fw-bold px-2 m-0">First time seen</p>
                <p class="px-2 m-0">10:20</p>
            </li>
            <li class="list-group-item bg-dark text-light d-flex">
                <p class="fw-bold px-2 m-0">Last time seen</p>
                <p class="px-2 m-0">80:20</p>
            </li>
            <li class="list-group-item bg-dark text-light d-flex">
                <p class="fw-bold px-2 m-0">Weight</p>
                <p class="px-2 m-0"></p>
            </li>
            <li class="list-group-item bg-dark text-light d-flex">
                <p class="fw-bold px-2 m-0">Height</p>
                <p class="px-2 m-0"></p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "BotDetailSkinInfo",
  props: ['skin']
}
</script>