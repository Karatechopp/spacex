const container_launches = document.querySelector(".container_launches");
const container_launches_rocket = document.querySelector(".container_launches_rocket");

const fetchLaunchUrl = "https://api.spacexdata.com/v5/launches/latest";

async function fetchLaunch(url) {

    container_launches.innerHTML = `<div class="loader"></div>`;

    try {
        const fetchResponse = await fetch(url);
        const json = await fetchResponse.json();

        container_launches.innerHTML = "";

        container_launches.innerHTML += `
        <img src="${json.links.patch.small}" class="patch" />
        <h4>Name: ${json.name}</h4>
        <p>Date: ${new Date(json.date_utc).toLocaleDateString()}<p>
        <img src="${json.links.flickr.original[1]}">
        <p>${json.details}</p>
        `
        let rocketid = "https://api.spacexdata.com/v4/rockets/" + json.rocket;

        fetchRocket(rocketid);

    }
    catch (error) {
        console.log("Error fetchLaunch msg:", error);
        container_launches.innerHTML = "error...";
    }
}

async function fetchRocket(rocketurl) {
    try {
        const fetchRocketResponse = await fetch(rocketurl);
        const jsonRocket = await fetchRocketResponse.json();

        container_launches_rocket.innerHTML += `
        <img src="${jsonRocket.flickr_images[1]}">
        <p>Height: ${jsonRocket.height.meters}m</p> 
        <p>Diameter:${jsonRocket.diameter.meters}m</p>
        <p>Mass:${jsonRocket.mass.kg}kg</p>
        <p>${jsonRocket.description}</p>
        `
    }
    catch (error) {
        console.log("Error FetchLaunchRocket msg:", error);
    }
}



fetchLaunch(fetchLaunchUrl);