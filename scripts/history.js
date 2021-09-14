const container_history = document.querySelector(".container_history");
const historylist = document.querySelector(".historylist");
const container_history_details = document.querySelector(".container_history_details");


const fetchUrl = "https://api.spacexdata.com/v4/history"

async function fetchHistory(url) {

    container_history_details.innerHTML = `<div class="loader"></div>`;

    try {
        const fetchResponse = await fetch(url);
        const json = await fetchResponse.json();

        for (i = 0; i < json.length; i++) {

            container_history.innerHTML += `
            <div class="dot" onclick=historyUpdate("${json[i].id}")></div>
            `

            container_history_details.innerHTML = `
            <h3>${json[0].title}</h3>
            <p>${new Date(json[0].event_date_utc).toLocaleDateString()}</p>
            <p>${json[0].details}</p>
            <a href="${json[0].links.article}">Article</a>
            `
        }

    }
    catch (error) {
        console.log("Error fetchHistory msg:", error);
    }

}

fetchHistory(fetchUrl);

async function historyUpdate(updateId) {


    try {
        const fetchResponse = await fetch("https://api.spacexdata.com/v4/history/" + updateId);
        const json = await fetchResponse.json();

        container_history_details.innerHTML = `
        <h4>${json.title}</h4>
        <p>${new Date(json.event_date_utc).toLocaleDateString()}</p>
        <p>${json.details}</p>
        <a href="${json.links.article}>Article</a>
        `
    }
    catch (error) {
        console.log("Error historyUpdate msg:", error);
    }
}