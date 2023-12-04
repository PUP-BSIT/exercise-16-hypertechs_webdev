let countryData;

function searchCountry() {
    const search_input = document.getElementById('search_input').value;

    fetch(`https://restcountries.com/v3.1/name/${search_input}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Country not found');
            }
            return response.json();
        })
        .then(data => {
            countryData = data;
            const country = countryData[0];
            const region = country.region;

            return fetch(`https://restcountries.com/v3.1/region/${region}`);
        })
        .then(response => response.json())
        .then(regionData => {
            const country = countryData[0];
            displayCountryDetails(country, regionData);
        })
        .catch(error => alert(error.message));
}

function displayCountryDetails(country, otherCountries) {
    const countryDetailsDiv = document.getElementById('country_details');
    const otherCountriesDiv = document.getElementById('other_countries');

    countryDetailsDiv.innerHTML = `
        <h2>${country.name.common}</h2>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>Area: ${country.area} square kilometers</p>
        <p>Region: ${country.region}</p>
        <p>Subregion: ${country.subregion}</p>
    `;

    otherCountriesDiv.innerHTML = 
        '<h3>Other Countries in the Same Region:</h3>';
    otherCountries.forEach(otherCountry => {
        otherCountriesDiv.innerHTML += `<p>${otherCountry.name.common}</p>`;
    });
}