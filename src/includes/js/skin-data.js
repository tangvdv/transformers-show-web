const skin_api_url = "http://localhost:3000/skin";

async function showSelectSkins(){
    await showSelectSkinAlts();
    await showSelectSkinBots();
    await showSelectSkinVoiceActors();
}

async function showSelectSkinAlts(){
    alts = await getAlts();
    const skinAltSelect = document.getElementById("show-skin-alt");
    skinAltSelect.innerHTML = `<option value="">Select...</option>`;
    alts.map(alt => {
        skinAltSelect.innerHTML += `<option value='${alt.id}'>${alt.alt_name}</option>`;
    });
}

async function showSelectSkinBots(){
    bots = await getBots();
    const skinBotSelect = document.getElementById("show-skin-bot");
    skinBotSelect.innerHTML = `<option value="">Select...</option>`;
    bots.map(bot => {
        skinBotSelect.innerHTML += `<option value='${bot.id}'>${bot.bot_name}</option>`;
    });
}

async function showSelectSkinVoiceActors(){
    voiceactors = await getVoiceActors();
    const skinVoiceActorSelect = document.getElementById("show-skin-va");
    skinVoiceActorSelect.innerHTML = `<option value="">Select...</option>`;
    voiceactors.map(voiceactor => {
        skinVoiceActorSelect.innerHTML += `<option value='${voiceactor.id}'>${voiceactor.voiceactor_name}</option>`;
    });
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

async function getSkinsByShowId(id){
    try{
        const res = await fetch(`${skin_api_url}/show/${id}`)
        const data = await res.json();
        return data.data;
    }
    catch (error){
        console.error(error);
    }
}

async function showSkinByShow(showId){
    const skinTable = document.getElementById("table-skin");
    skinTable.innerHTML = "";

    skins = await getSkinsByShowId(showId);
    if(skins.length > 0)
    {
        skins.map(skin => {
            skinTable.innerHTML += 
            `<tr class="align-items-center">
                <td><img src="/images/skin/${skin.image}" class="table-bot-poster"></td>
                <td>${secondsToHMS(skin.screen_time)}</td>
                <td>${skin.bot.bot_name}</td>
                <td>${skin.alt.alt_name}</td>
                <td>${skin.voiceactor.voiceactor_name}</td>
                <td><button type="button" class="btn btn-danger" onclick="deleteSkin(${skin.id},${showId})">X</button></td>
            </tr>`;
        });
    }
}

async function deleteSkin(skinId, showId){
    const options = {
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    };
    const errorLabel = document.getElementById("skin-error");
    try{
        const res = await fetch(`${skin_api_url}/${skinId}`, options);
        const data = await res.json();
        if (data.statusCode === 404) {
            errorLabel.innerHTML = data.error.description;
            errorLabel.className = "form-label text-danger";
        }
        else if(data.statusCode === 400){
            errorLabel.innerHTML = data.data;
            errorLabel.className = "form-label text-danger";
        }
        else if(data.statusCode === 200){
            errorLabel.innerHTML = data.data;
            errorLabel.className = "form-label text-success";
            await showSkinByShow(showId);
        }
    }
    catch (error){
        errorLabel.innerHTML = error;
        errorLabel.className = "form-label text-danger";
    }
}

async function createSkin(showId){
    const skinBotSelect = document.getElementById("show-skin-bot");
    botId = skinBotSelect.options[skinBotSelect.selectedIndex].value;

    const skinAltSelect = document.getElementById("show-skin-alt");
    altId = skinAltSelect.options[skinAltSelect.selectedIndex].value;

    const skinVoiceActorSelect = document.getElementById("show-skin-va");
    voiceactorId = skinVoiceActorSelect.options[skinVoiceActorSelect.selectedIndex].value;

    params = {
        "image": "null",
        "screen_time": 1,
        "show_id": showId,
        "bot_id": botId,
        "alt_id": altId
    };

    const options = {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params)  
    };
    const errorLabel = document.getElementById("skin-error");
    try{
        const res = await fetch(`${skin_api_url}`, options);
        const data = await res.json();
        if (data.statusCode === 404) {
            errorLabel.innerHTML = data.error.description;
            errorLabel.className = "form-label text-danger";
        }
        else if(data.statusCode === 400){
            errorLabel.innerHTML = data.data;
            errorLabel.className = "form-label text-danger";
        }
        else if(data.statusCode === 200){
            errorLabel.innerHTML = data.data.msg;
            errorLabel.className = "form-label text-success";
            await showSkinByShow(showId);
        }
    }
    catch(error){
        errorLabel.innerHTML = error;
        errorLabel.className = "form-label text-danger";
    }
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
                    <div class="d-flex align-items-center justify-content-center ${skin.voiceactor.id ? 'div-va-table' : ''} col-md-2 themed-grid-col py-2" ${ skin.voiceactor.id ? "type='button' onclick=window.location.href='/../src/voiceactor/voiceactor.php?id="+ skin.voiceactor.id +"';" : null }>${ skin.voiceactor.id ? skin.voiceactor.voiceactor_name : "" }</div>
                </div>
            </td>
        </tr>
        `;
    });
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