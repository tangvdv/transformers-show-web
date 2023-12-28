<template>
    <div class="d-flex">
        <div class="text-center list-group w-25 m-4">
            <p><b>Summary</b></p>
            <a href="#bot" class="list-group-item list-group-item-action">Bot</a>
            <a href="#actor" class="list-group-item list-group-item-action">Actor</a>
            <a href="#artefact" class="list-group-item list-group-item-action">Artefact</a>
            <a href="#anecdote" class="list-group-item list-group-item-action">Anecdote</a>
        </div>
        <div class="text-center flex-fill m-4">
            <p><b>Informations</b></p>
            <ul class="nav flex-column border rounded">
                <li class="my-4"><p class="m-0">{{ description }}</p></li>
                <hr>
                <li class="nav-item d-flex  px-4 "><p>Release date : </p><p class="mx-1">{{ release_date }}</p></li>
                <li class="nav-item d-flex  px-4 "><p>Producer : </p><p class="mx-1"></p></li>
                <li class="nav-item d-flex  px-4 "><p>Director : </p><p class="mx-1">{{ director.director_name }}</p></li>
            </ul>
        </div>    
    </div>
</template>

<script>
export default {
  name: "ShowInfo",
  props: ['description', 'release_date', 'producer', 'director'],
  data() {
    return {
      path: "http://localhost:5173/images/show/"
    };
  },
  methods: {
      redirect(id){
            window.location.href = `/src/show/show.html?id=${id}`
      }
  }
}
</script>