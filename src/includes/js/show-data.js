const api_url = "http://localhost:3000/show";

async function getShows(){
    let shows = [];

    const show_search = document.querySelector('input[type=search]');
    show_search.addEventListener("input", e =>{
        const value = e.target.value.toLowerCase();
        shows.forEach(show => {
            const isVisible = show.name.toLowerCase().includes(value);
            console.log(show.element.classList);
            show.element.classList.toggle("visually-hidden", !isVisible);
        })
    })

    await fetch(api_url)
    .then(res => {
        return res.json();
    })
    .then(data =>{
        const showContainer = document.getElementById("show-container");
        shows = data.data.map(show => {
            const div = document.createElement("div");
            div.classList.add("col-md-3", "col-sm-1");
            div.id = show.id;
            div.innerHTML = 
            `<div type="button" class="poster-div card shadow-sm" onclick="redirectShow(${show.id})">
                <img class="poster rounded-2" src="/images/show/${show.image}">
                <div class="card-body">
                    <p class="card-text text-center fs-5">${show.show_name}</p>
                </div>
            </div>`;
            showContainer.append(div);
            return { name: show.show_name, element: div };
        });
    })
}

async function getShow(id){
    await fetch(`${api_url}/id/${id}`)
    .then(res =>{
        return res.json()
    })
    .then(data=>{
        show = data.data;
        document.getElementById("show-name").innerHTML = show.show_name;
        document.getElementById("show-description").innerHTML = show.description;
        document.getElementById("show-release-date").innerHTML = show.release_date;
        document.getElementById("show-image").src = `/images/show/${show.image}`;
    });
}

function redirectShow(id){
    window.location.href = `/src/show/show.php?id=${id}`;
}

function redirectUpdateShow(id){
    window.location.href = `/src/show/updateShow.php?id=${id}`;
}

async function updateShow($id){
    console.log("yo");
}