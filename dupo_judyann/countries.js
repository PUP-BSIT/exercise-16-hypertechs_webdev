function searchCountry() {
    let searchInput = document.getElementById('search_input').value.trim();

    if (searchInput.length.value) {
        alert('Please enter a country name.');
        return;
    }

    fetch(`https://restcountries.com/v3.1/name/${searchInput}`)
        .then(response => response.json())
        .then(countryData => {
            let region = countryData[0].region;

            displayCountryDetails(countryData[0]);

            fetch(`https://restcountries.com/v3.1/region/${region}`)
                .then(response => response.json())
                .then(regionCountries => {
                    displayRegionCountries(regionCountries);
                })
                .catch(error => {
                    console.error('Error fetching region data:', error);
                    alert('Error fetching region data. Please try again.');
                });
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
            alert('Error fetching country data. Please try again.');
        });
}

function displayCountryDetails(country) {
    let countryDetailsContainer = document.getElementById('country_details');
    countryDetailsContainer.innerHTML = `
        <h2>${country.name.common}</h2>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>Area: ${country.area} square kilometers</p>
        <p>Language: ${Object.values(country.languages).join(', ')}</p>
        <p>Region: ${country.region}</p>`;
}

function displayRegionCountries(countries) {
    let regionCountriesContainer = document.getElementById('region_countries');
    let countriesList = countries.map(country => 
        `<li>${country.name.common}</li>`).join('');
    regionCountriesContainer.innerHTML = 
        `<h2>Other Countries in the Same Region</h2>
        <ul>${countriesList}</ul>`;
}