const actor_api_url = "http://localhost:3000/actor";

async function getActors(){
    let actors = [];

    const actor_search = document.querySelector('input[type=search]');
    actor_search.addEventListener("input", e =>{
        const value = e.target.value.toLowerCase();
        actors.forEach(actor => {
            const isVisible = actor.name.toLowerCase().includes(value);
            actor.element.classList.toggle("visually-hidden", !isVisible);
        })
    })

    await fetch(actor_api_url)
    .then(res => {
        return res.json();
    })
    .then(data =>{
        const actorContainer = document.getElementById("actor-container");
        actors = data.data.map(actor => {
            const div = document.createElement("div");
            div.classList.add("col-md-3", "col-sm-1");
            div.id = actor.id;
            div.innerHTML = 
            `<div type="button" class="actor-poster-div card shadow-sm" onclick="window.location.href='/src/actor/actor.php?id=${actor.id}';">
                <img class="actor-poster rounded-2" src="/images/actor/${actor.image}">
                <div class="card-body">
                    <p class="card-text text-center fs-5 m-0">${actor.actor_name}</p>
                    <p class="card-text text-center" style="font-size: small;"><em>${actor.character}</em></p>
                </div>
            </div>`;
            actorContainer.append(div);
            return { name: actor.actor_name, element: div };
        });
    })
}

async function getActor(id){
    try{
        const res = await fetch(`${actor_api_url}/id/${id}`)
        const data = await res.json();
        return data.data;
    }
    catch (error){
        console.error(error);
    }
}

async function displayActor(id){
    actor = await getActor(id);
    document.getElementById("actor-name").innerHTML = actor.actor_name;
    document.getElementById("actor-character").innerHTML = actor.character;
    document.getElementById("actor-image").src = `/images/actor/${actor.image}`;
}

async function displayUpdateActor(id){
    actor = await getActor(id);
    document.getElementById("form").action = `updateActorController.php?id=${id}&image=${actor.image}`;
    document.getElementById("actor-name").value = actor.actor_name;
    document.getElementById("actor-character").value = actor.character;
    document.getElementById("actor-origin").value = actor.origin;
    document.getElementById("actor-image").src = `/images/actor/${actor.image}`;
}

function redirectActor(id){
    window.location.href=`/src/actor/actor.php?id=${id}`;
}

async function updateActor(id, data){
    actor = await getActor(id);
    params = {};
    Object.keys(data).forEach(key => {
        if(data[key] !== actor[key]){
            if(data[key]){
                params[key] = data[key];
            }
        }
    });

    const options = {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params)  
    };

    fetch(`${actor_api_url}/${id}`, options)
    .then(res => {
        return res.json();
    }).then(data => {
        if (data.statusCode === 404) {
            window.location.href = `/src/actor/updateactor.php?id=${id}&error=${data.error.description}`;
        } else {
            window.location.href = `/src/actor/actor.php?id=${id}`;
        }
    }).catch(function(err) {
        console.error(err);
    });
}

async function createActor(data){
    params = {};
    Object.keys(data).forEach(key => {
        if(data[key]){
            params[key] = data[key];
        }
    });

    const options = {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params)  
    };

    fetch(`${actor_api_url}`, options)
    .then(res => {
        return res.json();
    }).then(data => {
        if (data.statusCode === 404) {
            window.location.href = `/src/actor/createactor.php?error=${data.error.description}`;
        } else {
            window.location.href = `/src/actor/index.php`;
        }
    }).catch(function(err) {
        console.error(err);
    });
}