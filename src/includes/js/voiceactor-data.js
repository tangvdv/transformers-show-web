const voiceactor_api_url = "http://localhost:3000/voiceactor";

async function getVoiceActors(){
    let voiceactors = [];

    const voiceactor_search = document.querySelector('input[type=search]');
    voiceactor_search.addEventListener("input", e =>{
        const value = e.target.value.toLowerCase();
        voiceactors.forEach(voiceactor => {
            const isVisible = voiceactor.name.toLowerCase().includes(value);
            voiceactor.element.classList.toggle("visually-hidden", !isVisible);
        })
    })

    await fetch(voiceactor_api_url)
    .then(res => {
        return res.json();
    })
    .then(data =>{
        const voiceactorContainer = document.getElementById("voiceactor-container");
        voiceactors = data.data.map(voiceactor => {
            return createVoiceActorDiv(voiceactor, voiceactorContainer, "regular");
        });
    })
}

async function getVoiceActorsByShow(showId){
    await fetch(`${voiceactor_api_url}/${showId}`)
    .then(res => {
        return res.json();
    })
    .then(data =>{
        const voiceactorContainer = document.getElementById("voiceactor-container");
        voiceactors = data.data.map(voiceactor => {
            console.log(voiceactor);
            return createVoiceActorDiv(voiceactor, voiceactorContainer, "small");
        });
    })
}

function createVoiceActorDiv(voiceactor, voiceactorContainer, containerSize){
    const div = document.createElement("div");
    div.classList.add("col-md-3", "col-sm-1");
    div.id = voiceactor.id;
    div.innerHTML = 
    `<div type="button" class="voiceactor-poster-div-${containerSize} card shadow-sm" onclick="window.location.href='/src/voiceactor/voiceactor.php?id=${voiceactor.id}';">
        <img class="voiceactor-poster-${containerSize} rounded-2" src="/images/voiceactor/${voiceactor.image}">
        <div class="card-body p-1">
            <p class="card-text text-center m-0 voiceactor-poster-name-${containerSize}">${voiceactor.voiceactor_name}</p>
        </div>
    </div>`;
    voiceactorContainer.append(div);
    return { name: voiceactor.voiceactor_name, element: div };
}

async function getVoiceActor(id){
    try{
        const res = await fetch(`${voiceactor_api_url}/id/${id}`)
        const data = await res.json();
        return data.data;
    }
    catch (error){
        console.error(error);
    }
}

async function displayVoiceActor(id){
    voiceactor = await getVoiceActor(id);
    console.log(voiceactor);
    document.getElementById("voiceactor-name").innerHTML = voiceactor.voiceactor_name;
    document.getElementById("voiceactor-image").src = `/images/voiceactor/${voiceactor.image}`;
}

async function displayUpdateVoiceActor(id){
    voiceactor = await getVoiceActor(id);
    document.getElementById("form").action = `updateVoiceActorController.php?id=${id}&image=${voiceactor.image}`;
    document.getElementById("voiceactor-name").value = voiceactor.voiceactor_name;
    document.getElementById("voiceactor-dubb").value = voiceactor.dubbing_localization;
    document.getElementById("voiceactor-origin").value = voiceactor.origin;
    document.getElementById("voiceactor-image").src = `/images/voiceactor/${voiceactor.image}`;
}

function redirectVoiceActor(id){
    window.location.href=`/src/voiceactor/voiceActor.php?id=${id}`;
}

async function updateVoiceActor(id, data){
    voiceactor = await getVoiceActor(id);
    params = {};
    Object.keys(data).forEach(key => {
        if(data[key] !== voiceactor[key]){
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

    fetch(`${voiceactor_api_url}/${id}`, options)
    .then(res => {
        return res.json();
    }).then(data => {
        if (data.statusCode === 404) {
            window.location.href = `/src/voiceactor/updateVoiceActor.php?id=${id}&error=${data.error.description}`;
        } else {
            window.location.href = `/src/voiceactor/voiceActor.php?id=${id}`;
        }
    }).catch(function(err) {
        console.error(err);
    });
}

async function createVoiceActor(data){
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

    fetch(`${voiceactor_api_url}`, options)
    .then(res => {
        return res.json();
    }).then(data => {
        if (data.statusCode === 404) {
            window.location.href = `/src/voiceactor/createvoiceActor.php?error=${data.error.description}`;
        } else {
            window.location.href = `/src/voiceactor/index.php`;
        }
    }).catch(function(err) {
        console.error(err);
    });
}