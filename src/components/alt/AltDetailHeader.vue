<template>
    <div class="d-flex justify-content-center py-3">
        <p>{{ description }}</p>
        <ul class="nav nav-pills">
            <li class="nav-item d-flex px-4"><p>Brand : {{ brand }}</p></li>
            <li class="nav-item d-flex px-4"><p>Model year : {{ model_year }}</p></li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "AltDetailInfo",
  props: ['description', 'brand', 'model_year'],
}
</script>