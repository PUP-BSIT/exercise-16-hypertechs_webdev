function searchCountry() {
    let countryName = document.getElementById("search_input").value;

    // Make the first API request to get country details
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            // Extract region from the response
            let region = data[0].region;

            // Display country details
            displayCountryDetails(data[0]);

            // Make the second API request to get 
            //other countries in the same region
            fetch(`https://restcountries.com/v3.1/region/${region}`)
                .then(response => response.json())
                .then(regionData => {
                    // Display other countries in the same region
                    displayRegionCountries(regionData);
                })
        })
}

function displayCountryDetails(country) {
    let countryDetailsContainer = document.getElementById("country_details");
    countryDetailsContainer.innerHTML = `
        <h2>${country.name.common}</h2>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>Area: ${country.area} square kilometers</p>
        <p>Region: ${country.region}</p>
        <p>Subregion: ${country.subregion}</p>
        <p>flag:</p>
        <img src="${country.flags.png}">
    `;
}

function displayRegionCountries(regionData) {
    let regionCountriesContainer = document.getElementById("region_countries");
    regionCountriesContainer.innerHTML = 
        "<h3>Other Countries in the Same Region</h3>";

    // Create a single <ul> for all countries
    regionCountriesContainer.innerHTML += "<ul id='country_list'></ul>";
    
    // Get the <ul> element
    let countryList = document.getElementById("country_list");

    regionData.forEach(country => {
        // Add each country as an <li> to the existing <ul>
        countryList.innerHTML += `<li>${country.name.common}</li>`;
    });
}