const show_api_url = "http://localhost:3000/show";

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

async function getShow(id){
    try{
        const res = await fetch(`${show_api_url}/id/${id}`)
        const data = await res.json();
        return data.data;
    }
    catch{
        console.error(error);
    }
}

async function displayShow(id){
    show = await getShow(id);
    document.getElementById("show-name").innerHTML = show.show_name;
    document.getElementById("show-description").innerHTML = show.description;
    document.getElementById("show-release-date").innerHTML = show.release_date;
    document.getElementById("show-image").src = `/images/show/${show.image}`;
    let producers = [];
    show.producer.forEach(producer => {
        producers.push(producer.producer_name);
    });
    console.log(producers);
    document.getElementById("show-producer").innerHTML = producers.join(' | ');
    document.getElementById("show-director").innerHTML = show.director;
}

async function displayUpdateShow(id){
    show = await getShow(id);
    document.getElementById("form").action = `updateShowController.php?id=${id}&image=${show.image}`;
    document.getElementById("show-name").value = show.show_name;
    document.getElementById("show-description").innerHTML = show.description;
    document.getElementById("show-type").value = show.type;
    document.getElementById("show-release-date").value = show.release_date;
    document.getElementById("show-image").src = `/images/show/${show.image}`;
    if(show.producer.length > 0)
    {
        show.producer.map(producer => {
            showProducerByShow(producer, show.id);
        });
    }
    await getProducers();
    await getDirectors();
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
        console.log(data);
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
        console.log(data);
        if (data.statusCode === 404) {
            window.location.href = `/src/show/createShow.php?error=${data.error.description}`;
        } else {
            window.location.href = `/src/show/index.php`;
        }
    }).catch(function(err) {
        console.error(err);
    });
}