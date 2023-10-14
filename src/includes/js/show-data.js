const show_api_url = "http://localhost:3000/show";
const skin_api_url= "http://localhost:3000/skin";

const factionArray = {
    1 : "Autobot",
    2 : "Decepticon",
    3 : "Maximal",
    4 : "Predacon",
    5 : "Terrorcon"
}


async function getShows(){
    let shows = [];

    const show_search = document.querySelector('input[type=search]');
    show_search.addEventListener("input", e =>{
        const value = e.target.value.toLowerCase();
        shows.forEach(show => {
            const isVisible = show.name.toLowerCase().includes(value);
            show.element.classList.toggle("visually-hidden", !isVisible);
        })
    })

    await fetch(show_api_url)
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
            `<div type="button" class="poster-div card shadow-sm" onclick="window.location.href='/src/show/show.php?id=${show.id}';">
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

async function getSkins(){
    try{
        const res = await fetch(`${skin_api_url}`)
        const data = await res.json();
        return data.data;
    }
    catch (error){
        console.error(error);
    }
}

async function getShow(id){
    try{
        const res = await fetch(`${show_api_url}/id/${id}`)
        const data = await res.json();
        return data.data;
    }
    catch (error){
        console.error(error);
    }
}

async function displayShow(id){
    show = await getShow(id);
    displayShowInformations(show);
    await displayShowSkinsTable(show);
    await getActorsByShow(id);
}

function displayShowInformations(data){
    document.getElementById("show-name").innerHTML = show.show_name;
    document.getElementById("show-description").innerHTML = show.description;
    document.getElementById("show-release-date").innerHTML = show.release_date;
    document.getElementById("show-image").src = `/images/show/${show.image}`;
    let producers = [];
    show.producer.forEach(producer => {
        producers.push(producer.producer_name);
    });
    document.getElementById("show-producer").innerHTML = producers.join(' | ');
    document.getElementById("show-director").innerHTML = show.director;
}

function secondsToHMS(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
  
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

async function displayShowSkinsTable(data){
    skins = await getSkins();
    let tbody = document.getElementById("skin-table");
    skins.forEach(skin => {
        tbody.innerHTML += 
        `<tr>
            <td class="p-0">
                <div class="row justify-content-center text-center px-3" style="vertical-align: middle">
                    <div class="div-bot-table col-md-7 themed-grid-col py-2" type="button" onclick="window.location.href='/../src/bot/bot.php?id=${skin.bot.id}';">
                        <div class="row align-items-center">
                            <div class="col-md-3 themed-grid-col"><img src="/images/skin/${skin.image}" class="table-bot-poster"></div>
                            <div class="col-md-3 themed-grid-col">${skin.bot.bot_name}</div>
                            <div class="col-md-3 themed-grid-col">${factionArray[skin.bot.faction]}</div>
                            <div class="col-md-3 themed-grid-col">${secondsToHMS(skin.screen_time)}</div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-center div-alt-table col-md-2 themed-grid-col py-2" type="button" onclick="window.location.href='/../src/alt/alt.php?id=${skin.alt.id}';">${skin.alt.alt_name}</div>
                    <div class="d-flex align-items-center justify-content-center div-va-table col-md-2 themed-grid-col py-2" type="button" onclick="window.location.href='/../src/voiceactor/voiceactor.php?id=1';">Petter Cullen</div>
                </div>
            </td>
        </tr>
        `;
    });
}

async function displayUpdateShow(id){
    show = await getShow(id);
    document.getElementById("form").action = `updateShowController.php?id=${id}&image=${show.image}`;
    document.getElementById("show-name").value = show.show_name;
    document.getElementById("show-description").innerHTML = show.description;
    document.getElementById("show-type").value = show.type;
    document.getElementById("show-release-date").value = show.release_date;
    document.getElementById("show-image").src = `/images/show/${show.image}`;

    director = await getDirectorByName(show.director);
    showProducerByShow(show.producer, show.id);
    await showSelectProducers(show.producer);
    await showSelectDirectors();
    document.getElementById("show-director").value = director.id;
}

function redirectShow(id){
    window.location.href=`/src/show/show.php?id=${id}`;
}

async function updateShow(id, data){
    show = await getShow(id);
    params = {};
    Object.keys(data).forEach(key => {
        if(data[key] !== show[key]){
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

    fetch(`${show_api_url}/${id}`, options)
    .then(res => {
        return res.json();
    }).then(data => {
        if (data.statusCode === 404) {
            window.location.href = `/src/show/updateShow.php?id=${id}&error=${data.error.description}`;
        } else {
            window.location.href = `/src/show/show.php?id=${id}`;
        }
    }).catch(function(err) {
        console.error(err);
    });
}

async function createShow(data){
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

    fetch(`${show_api_url}`, options)
    .then(res => {
        return res.json();
    }).then(data => {
        if (data.statusCode === 404) {
            window.location.href = `/src/show/createShow.php?error=${data.error.description}`;
        } else {
            window.location.href = `/src/show/index.php`;
        }
    }).catch(function(err) {
        console.error(err);
    });
}