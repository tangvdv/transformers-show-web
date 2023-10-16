const actor_api_url = "http://localhost:3000/actor";

async function getActors(){
    try{
        const res = await fetch(`${actor_api_url}`)
        const data = await res.json();
        return data.data;
    }
    catch (error){
        console.error(error);
    }
}

async function actorIndexManager(){
    let actors = [];

    const actor_search = document.querySelector('input[type=search]');
    actor_search.addEventListener("input", e =>{
        const value = e.target.value.toLowerCase();
        actors.forEach(actor => {
            const isVisible = actor.name.toLowerCase().includes(value);
            actor.element.classList.toggle("visually-hidden", !isVisible);
        })
    })

    data = await getActors();
    const actorContainer = document.getElementById("actor-container");
    actors = data.map(actor => {
        return createActorDiv(actor, actorContainer, "regular");
    });
}

async function getActorsByShow(showId){
    await fetch(`${actor_api_url}/show/${showId}`)
    .then(res => {
        return res.json();
    })
    .then(data =>{
        const actorContainer = document.getElementById("actor-container");
        data.data.map(actor => {
            return createActorDiv(actor, actorContainer, "small");
        });
    })
}

function createActorDiv(actor, actorContainer, containerSize){
    const div = document.createElement("div");
    div.classList.add("col-md-3", "col-sm-1");
    div.id = actor.id;
    div.innerHTML = 
    `<div type="button" class="actor-poster-div-${containerSize} card shadow-sm" onclick="window.location.href='/src/actor/actor.php?id=${actor.id}';">
        <img class="actor-poster-${containerSize} rounded-2" src="/images/actor/${actor.image}">
        <div class="card-body p-1">
            <p class="card-text text-center m-0 actor-poster-name-${containerSize}">${actor.actor_name}</p>
            <p class="card-text text-center actor-poster-character-${containerSize}" style="font-size: small;"><em>${actor.character}</em></p>
        </div>
    </div>`;
    actorContainer.append(div);
    return { name: actor.actor_name, element: div };
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
    console.log(actor);
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

async function addActorHasShow(showId){
    const actorSelect = document.getElementById("show-actor");
    actorId = actorSelect.options[actorSelect.selectedIndex].value;

    const options = {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    };

    try{
        const res = await fetch(`${actor_api_url}/${actorId}/${showId}`, options);
        const data = await res.json();
        if(data.statusCode === 200){
            show = await getShow(showId);
            await showSelectActors(show.actor);
            showActorByShow(show.actor, showId);
        }
    }
    catch (error){
        console.error(error);
    }
}

async function deleteActorHasShow(actorId, showId){
    const options = {
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    };

    try{
        const res = await fetch(`${actor_api_url}/${actorId}/${showId}`, options);
        const data = await res.json();
        if(data.statusCode === 200){
            show = await getShow(showId);
            await showSelectActors(show.actor);
            showActorByShow(show.actor, showId);
        }
    }
    catch (error){
        console.error(error);
    }
}

async function showSelectActors(actors){
    let aIds = [];
    if(actors.length > 0){
        actors.map(a => {
            aIds.push(a.id);
        });
    }
    actors = await getActors();
    
    const actorSelect = document.getElementById("show-actor");
    actorSelect.innerHTML = `<option value="">Add...</option>`;
    actors.map(actor => {
        if(!(aIds.includes(actor.id)))
        {
            actorSelect.innerHTML += `<option value='${actor.id}'>${actor.actor_name}</option>`;
        }
    });
}

function showActorByShow(actors, showId){
    const actorTable = document.getElementById("table-actor");
    actorTable.innerHTML = "";

    if(actors.length > 0)
    {
        actors.map(actor => {
            actorTable.innerHTML += 
            `<tr>
                <td>${actor.actor_name}</td>
                <td>${actor.character}</td>
                <td><button type="button" class="btn btn-danger" onclick="deleteActorHasShow(${actor.id},${showId})">X</button></td>
            </tr>`;
        });
    }
}