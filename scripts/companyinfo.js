const container_company = document.querySelector(".container_company");
const container_company_links = document.querySelector(".container_company_links");


const fetchCompanyUrl = "https://api.spacexdata.com/v4/company";

async function fetchCompanyInfo(url) {

    container_company.innerHTML = `<div class="loader"></div>`;
    container_company_links.innerHTML = `<div class="loader"></div>`;

    try {
        const fetchResponse = await fetch(url);
        const json = await fetchResponse.json();

        container_company.innerHTML = `
            <p>${json.founder} founded ${json.name} in ${json.founded} it now has ${json.employees} employees, ${json.vehicles} vehicles, and ${json.launch_sites} launch sites.</p>
            <p>Currently sits at a valuation of $${json.valuation.toLocaleString()}</p>
            <p>${json.summary}</p>
        `

        container_company_links.innerHTML = `
        <a href="${json.links.website}" target="_blank"><img src="_images/spacex_x.png" class="link_icon">Official website</a>
        <p></p>
        <a href="${json.links.flickr}" target="_blank"><img src="_images/flickr.svg" class="link_icon">Flickr</a>
        <p></p>
        <a href="${json.links.twitter}" target="_blank"><img src="_images/twitter.svg" class="link_icon">Twitter</a>
        <p></p>
        <a href="${json.links.elon_twitter}" target="_blank"><img src="_images/twitter.svg" class="link_icon">Elon Musk twitter</a>
        `

    }
    catch (error) {
        console.log("Error fetchHistory msg:", error);
    }

}

fetchCompanyInfo(fetchCompanyUrl);