const container_launches = document.querySelector(".container_launches");
const container_launches_rocket = document.querySelector(".container_launches_rocket");
const iframe_youtube_embed = document.querySelector(".iframe_youtube_embed");
const container_launches_resources = document.querySelector(".container_launches_resources");

const dropdown = document.querySelector("select");

let latestLaunch;

// populate the dropdown with all availiable launches
async function fetchLaunchDropdown() {

    // Populate page with latest launch and get latest launch on top of dropdown
    fetchLaunch("https://api.spacexdata.com/v5/launches/Latest");

    try {
        const fetchResponse = await fetch("https://api.spacexdata.com/v5/launches/");
        const json = await fetchResponse.json();

        // make sure the latest launch is at the top
        dropdown.innerHTML += `
        ${latestLaunch}
        `

        for (i = 0; i < json.length; i++) {
            dropdown.innerHTML += `
            <option value="${json[i].id}">${new Date(json[i].date_utc).toLocaleDateString("en-GB")} - ${json[i].name}</option>
        `
        }
    } catch (error) {
        console.log("Error fetchLaunchDropdown msg:", error);
        container_launches.innerHTML = "error...";
    }
}

fetchLaunchDropdown();

// new api call on dropdown change
dropdown.onchange = function () {

    const selectedValue = "https://api.spacexdata.com/v5/launches/" + event.target.value;

    fetchLaunch(selectedValue);
}

// Fetching specific launches from dropdown menu
async function fetchLaunch(url) {

    container_launches.innerHTML = `<div class="loader"></div>`;

    try {
        const fetchResponse = await fetch(url);
        const json = await fetchResponse.json();

        container_launches.innerHTML = "";

        // set latest launch to use at top of dropdown in fetchLaunchDropdown()
        if (latestLaunch == undefined) {
            latestLaunch = "<option value=" + "'" + json.id + "'>" + "Latest" + " - " + json.name + "</option>";
        }

        // fill in launch info
        container_launches.innerHTML = `<h4>${json.name}</h4>`;
        if (json.links.patch) { container_launches.innerHTML += `<img src="${json.links.patch.small}" class="patch" />` }
        container_launches.innerHTML += `<p>${new Date(json.date_utc).toLocaleDateString("en-GB")}</p>`;
        if (json.links.flickr.original.length != 0) { container_launches.innerHTML += `<img src="${json.links.flickr.original[0]}" />` }
        if (json.details) { container_launches.innerHTML += `<p>${json.details}</p>` }
        if (json.failures.length != 0) { container_launches.innerHTML += `<p>Failure: ${json.failures[0].reason}</p>` }
        if (json.links.article) { container_launches.innerHTML += `<p><a href="${json.links.article}">Article</a></p>` }

        // send rocket id to fetchRocket()
        let rocketid = "https://api.spacexdata.com/v4/rockets/" + json.rocket;
        fetchRocket(rocketid);

        if (json.links.youtube_id) {
            iframe_youtube_embed.innerHTML = `
            <h4>Webcast</h4>
        <iframe class="youtube_frame" src="https://www.youtube.com/embed/${json.links.youtube_id}" width="375" height="200" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        `
        }

        // fill in resources
        container_launches_resources.innerHTML = "";
        if (json.links.reddit.campaign) { container_launches_resources.innerHTML = `<a href="${json.links.reddit.campaign}" target="_blank"><img class="link_icon" src="_images/reddit.svg" />Reddit campaign</a><p></p>` }
        if (json.links.reddit.launch) { container_launches_resources.innerHTML += `<a href="${json.links.reddit.launch}" target="_blank"><img class="link_icon" src="_images/reddit.svg"" />Reddit launch</a><p></p>` }
        if (json.links.wikipedia) { container_launches_resources.innerHTML += `<a href="${json.links.wikipedia}" target="_blank"><img class="link_icon" src="_images/wikipedia.svg" />Wikipedia article</a>` }
    }
    catch (error) {
        console.log("Error fetchLaunch msg:", error);
        container_launches.innerHTML = "error...";
    }
}

// fetching rocket info, function initiated in fetchLaunch
async function fetchRocket(rocketurl) {
    try {
        const fetchRocketResponse = await fetch(rocketurl);
        const jsonRocket = await fetchRocketResponse.json();

        container_launches_rocket.innerHTML = `
            <h4>${jsonRocket.name}</h4>
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


// populate the page with the latest launch on initial load
