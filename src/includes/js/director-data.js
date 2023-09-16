const director_api_url = "http://localhost:3000/director";

async function getDirectors(){
    await fetch(director_api_url)
    .then(res => {
        return res.json();
    })
    .then(data =>{
        const directorSelect = document.getElementById("show-director");
        shows = data.data.map(director => {
            directorSelect.innerHTML += `<option value='${director.id}'>${director.director_name}</option>`;
        });
    })
}