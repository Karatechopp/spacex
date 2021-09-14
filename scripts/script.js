const container = document.querySelector(".container");

console.log(container)

const fetchUrl = "https://api.spacexdata.com/v4/dragons";

async function fetchFunction(url) {

    container.innerHTML = `<div class="loader"></div>`;

    try {
        const fetchResponse = await fetch(url);
        const json = await fetchResponse.json();

        console.log(json);

        container.innerHTML = "";

        console.log(json.length);

        for (i = 0; i < json.length; i++) {

            for (x = 0; x < json[i].flickr_images.length; x++) {
                if (json[i].flickr_images[x] !== undefined) {
                    var images = `
                        ${images}
                <img src="${json[i].flickr_images[x]}"></img>
                `
                }
            }




            container.innerHTML += `
        <div class="card">
        <h3>${json[i].name}</h3>
        ${images}
        <p>${json[i].description}</p>
        </div>
        `
            var images = undefined;
        }
    }
    catch (error) {
        console.log("Error msg:", error);
        container.innerHTML = "error...";
    }
}

fetchFunction(fetchUrl);