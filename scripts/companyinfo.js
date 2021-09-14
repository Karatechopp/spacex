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
        <a href="${json.links.website}">Official website</a>
        <p></p>
        <a href="${json.links.flickr}">Flickr</a>
        <p></p>
        <a href="${json.links.twitter}">Twitter</a>
        <p></p>
        <a href="${json.links.elon_twitter}">Elon Musk twitter</a>
        `

    }
    catch (error) {
        console.log("Error fetchHistory msg:", error);
    }

}

fetchCompanyInfo(fetchCompanyUrl);