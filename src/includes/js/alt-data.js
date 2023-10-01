const alt_api_url = "http://localhost:3000/alt";

async function getAlts(){
    let alts = [];

    const alt_search = document.querySelector('input[type=search]');
    alt_search.addEventListener("input", e =>{
        const value = e.target.value.toLowerCase();
        alts.forEach(alt => {
            const isVisible = alt.name.toLowerCase().includes(value);
            alt.element.classList.toggle("visually-hidden", !isVisible);
        })
    })

    await fetch(alt_api_url)
    .then(res => {
        return res.json();
    })
    .then(data =>{
        const altContainer = document.getElementById("alt-container");
        alts = data.data.map(alt => {
            const div = document.createElement("div");
            div.classList.add("col-md-3", "col-sm-1");
            div.id = alt.id;
            div.innerHTML = 
            `<div type="button" class="alt-poster card shadow-sm" onclick="window.location.href='/src/alt/alt.php?id=${alt.id}';">
                <img class="alt-poster rounded-2" src="/images/alt/${alt.image}">
                <div class="card-body">
                    <p class="card-text text-center fs-5">${alt.alt_name}</p>
                </div>
            </div>`;
            altContainer.append(div);
            return { name: alt.alt_name, element: div };
        });
    })
}

async function getAlt(id){
    try{
        const res = await fetch(`${alt_api_url}/id/${id}`)
        const data = await res.json();
        return data.data;
    }
    catch (error){
        console.error(error);
    }
}

async function displayAlt(id){
    alt = await getAlt(id);
    document.getElementById("alt-name").innerHTML = alt.alt_name;
    document.getElementById("alt-brand").innerHTML = alt.brand;
    document.getElementById("alt-image").src = `/images/alt/${alt.image}`;
}

async function displayUpdateAlt(id){
    alt = await getAlt(id);
    document.getElementById("form").action = `updateAltController.php?id=${id}&image=${alt.image}`;
    document.getElementById("alt-name").value = alt.alt_name;
    console.log(alt.brand);
    document.getElementById("alt-brand").innerHTML = alt.brand;
    document.getElementById("alt-image").src = `/images/alt/${alt.image}`;
}

function redirectAlt(id){
    window.location.href=`/src/alt/alt.php?id=${id}`;
}

async function updateAlt(id, data){
    alt = await getAlt(id);
    params = {};
    Object.keys(data).forEach(key => {
        if(data[key] !== alt[key]){
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

    fetch(`${alt_api_url}/${id}`, options)
    .then(res => {
        return res.json();
    }).then(data => {
        if (data.statusCode === 404) {
            window.location.href = `/src/alt/updateAlt.php?id=${id}&error=${data.error.description}`;
        } else {
            window.location.href = `/src/alt/alt.php?id=${id}`;
        }
    }).catch(function(err) {
        console.error(err);
    });
}

async function createAlt(data){
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

    fetch(`${alt_api_url}`, options)
    .then(res => {
        return res.json();
    }).then(data => {
        if (data.statusCode === 404) {
            window.location.href = `/src/alt/createAlt.php?error=${data.error.description}`;
        } else {
            window.location.href = `/src/alt/index.php`;
        }
    }).catch(function(err) {
        console.error(err);
    });
}