const producer_api_url = "http://localhost:3000/producer";

async function showSelectProducers(producers){
    let pIds = [];
    if(producers.length > 0){
        producers.map(p => {
            pIds.push(p.id);
        });
    }
    producers = await getProducers();
    
    const producerSelect = document.getElementById("show-producer");
    producerSelect.innerHTML = `<option value="">Add...</option>`;
    producers.map(producer => {
        if(!(pIds.includes(producer.id)))
        {
            producerSelect.innerHTML += `<option value='${producer.id}'>${producer.producer_name}</option>`;
        }
    });
}

async function getProducers(){
    try{
        const res = await fetch(`${producer_api_url}`)
        const data = await res.json();
        return data.data;
    }
    catch (error){
        console.error(error);
    }
}

function showProducerByShow(producers, showId){
    const producerTable = document.getElementById("table-producer");
    producerTable.innerHTML = "";

    if(producers.length > 0)
    {
        producers.map(producer => {
            producerTable.innerHTML += 
            `<tr>
                <td>${producer.producer_name}</td>
                <td><button type="button" class="btn btn-danger" onclick="deleteProducerAsShow(${producer.id},${showId})">X</button></td>
            </tr>`;
        });
    }
}

async function deleteProducerAsShow(producerId, showId){
    const options = {
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    };

    try{
        const res = await fetch(`${producer_api_url}/${producerId}/${showId}`, options);
        const data = await res.json();
        if(data.statusCode === 200){
            show = await getShow(showId);
            await showSelectProducers(show.producer);
            showProducerByShow(show.producer, showId);
        }
    }
    catch (error){
        console.error(error);
    }
}

async function getProducer(id){
    try{
        const res = await fetch(`${producer_api_url}/id/${id}`)
        const data = await res.json();
        return data.data;
    }
    catch{
        console.error(error);
    }
}

async function addProducerAsShow(showId){
    const producerSelect = document.getElementById("show-producer");
    producerId = producerSelect.options[producerSelect.selectedIndex].value;

    const options = {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    };

    try{
        const res = await fetch(`${producer_api_url}/${producerId}/${showId}`, options);
        const data = await res.json();
        if(data.statusCode === 200){
            show = await getShow(showId);
            await showSelectProducers(show.producer);
            showProducerByShow(show.producer, showId);
        }
    }
    catch (error){
        console.error(error);
    }
}