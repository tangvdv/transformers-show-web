const bot_api_url = "http://localhost:3000/bot";

async function getBots(){
    try{
        const res = await fetch(`${bot_api_url}`)
        const data = await res.json();
        return data.data;
    }
    catch (error){
        console.error(error);
    }
}

async function botIndexManager(){
    let bots = [];

    const bot_search = document.querySelector('input[type=search]');
    bot_search.addEventListener("input", e =>{
        const value = e.target.value.toLowerCase();
        bots.forEach(bot => {
            const isVisible = bot.name.toLowerCase().includes(value);
            bot.element.classList.toggle("visually-hidden", !isVisible);
        })
    })

    data = await getBots();

    const botContainer = document.getElementById("bot-container");
    bots = data.map(bot => {
        const div = document.createElement("div");
        div.classList.add("col-md-3", "col-sm-1");
        div.id = bot.id;
        div.innerHTML = 
        `<div type="button" class="poster-div card shadow-sm" onclick="window.location.href='/src/bot/bot.php?id=${bot.id}';">
            <img class="poster rounded-2" src="/images/bot/${bot.image}">
            <div class="card-body">
                <p class="card-text text-center fs-5">${bot.bot_name}</p>
            </div>
        </div>`;
        botContainer.append(div);
        return { name: bot.bot_name, element: div };
    });
}

async function getBot(id){
    try{
        const res = await fetch(`${bot_api_url}/id/${id}`)
        const data = await res.json();
        return data.data;
    }
    catch (error){
        console.error(error);
    }
}

async function displayBot(id){
    bot = await getBot(id);
    document.getElementById("bot-name").innerHTML = bot.bot_name;
    document.getElementById("bot-description").innerHTML = bot.description;
    document.getElementById("bot-faction").innerHTML = factionArray[bot.faction];
    document.getElementById("bot-image").src = `/images/bot/${bot.image}`;
}

async function displayUpdateBot(id){
    bot = await getBot(id);
    document.getElementById("form").action = `updateBotController.php?id=${id}&image=${bot.image}`;
    document.getElementById("bot-name").value = bot.bot_name;
    document.getElementById("bot-description").innerHTML = bot.description;
    document.getElementById("bot-faction").value = bot.faction;
    document.getElementById("bot-image").src = `/images/bot/${bot.image}`;
}

function redirectBot(id){
    window.location.href=`/src/bot/bot.php?id=${id}`;
}

async function updateBot(id, data){
    bot = await getBot(id);
    params = {};
    Object.keys(data).forEach(key => {
        if(data[key] !== bot[key]){
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

    fetch(`${bot_api_url}/${id}`, options)
    .then(res => {
        return res.json();
    }).then(data => {
        if (data.statusCode === 404) {
            window.location.href = `/src/bot/updatebot.php?id=${id}&error=${data.error.description}`;
        } else {
            window.location.href = `/src/bot/bot.php?id=${id}`;
        }
    }).catch(function(err) {
        console.error(err);
    });
}

async function createBot(data){
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

    fetch(`${bot_api_url}`, options)
    .then(res => {
        return res.json();
    }).then(data => {
        if (data.statusCode === 404) {
            window.location.href = `/src/bot/createbot.php?error=${data.error.description}`;
        } else {
            window.location.href = `/src/bot/index.php`;
        }
    }).catch(function(err) {
        console.error(err);
    });
}