const director_api_url = "http://localhost:3000/director";

async function showSelectDirectors(){
    directors = await getDirectors();
    
    const directorSelect = document.getElementById("show-director");
    directors.map(director => {
        directorSelect.innerHTML += `<option value='${director.id}'>${director.director_name}</option>`;
    });
}

async function getDirectors(){
    try{
        const res = await fetch(`${director_api_url}`)
        const data = await res.json();
        return data.data;
    }
    catch (error){
        console.error(error);
    }
}

async function getDirectorByName(directorName){
    try{
        const res = await fetch(`${director_api_url}/name/${directorName}`)
        const data = await res.json();
        return data.data;
    }
    catch (error){
        console.error(error);
    }
}

async function addDirectorHasShow(showId){
    const directorSelect = document.getElementById("show-director");
    directorId = directorSelect.options[directorSelect.selectedIndex].value;

    const options = {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    };

    try{
        await fetch(`${director_api_url}/${directorId}/${showId}`, options);
    }
    catch (error){
        console.error(error);
    }
}