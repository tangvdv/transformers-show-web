const producer_api_url = "http://localhost:3000/producer";

async function getProducers(){
    await fetch(producer_api_url)
    .then(res => {
        return res.json();
    })
    .then(data =>{
        const producerSelect = document.getElementById("show-producer");
        shows = data.data.map(producer => {
            producerSelect.innerHTML += `<option value='${producer.id}'>${producer.producer_name}</option>`;
        });
    })
}

function showProducerByShow(producer, showId){
    const producerTable = document.getElementById("table-producer");
    producerTable.innerHTML += 
    `<tr>
        <td>${producer.producer_name}</td>
        <td><button type="button" class="btn btn-danger" onclick="deleteProducerAsShow(${producer.id},${showId})">X</button></td>
    </tr>`;
}

async function deleteProducerAsShow(producerId, showId){
    const options = {
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    };

    fetch(`${producer_api_url}/${producerId}/${showId}`, options)
    .then(res => {
        return res.json();
    }).then(data => {
        if(data.statusCode === 200){
            location.reload();
        }
    }).catch(function(err) {
        console.error(err);
    });
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
            producer = await getProducer(producerId);
            console.log(producer);
            showProducerByShow(producer, showId);
        }
    }
    catch{
        console.error(error);
    }
}