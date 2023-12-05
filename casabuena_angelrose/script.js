let nameField = document.getElementById("name");
let commentField = document.getElementById("comment");
let commentButton = document.getElementById("comment_button");
let comSection = document.getElementById("comment_section");
let sortOrder = 'desc'; //Default sort order
let commentQueue = [];
let countryData;

function enableCommentButton() {
    if (nameField.value.length && commentField.value.length) {
        commentButton.disabled = false;
    } else {
        commentButton.disabled = true;
    }
}

function addComment() {
    let commentDate = new Date();
    let comments = {
        comment_name: nameField.value,
        text_comment: commentField.value,
        timestamp: commentDate.getTime()
    };

    commentQueue.push(comments);

    sortComments();
    renderComments();

    nameField.value = "";
    commentField.value = "";
    commentButton.disabled = true;
}

function renderComments() {
    comSection.innerHTML = "";
    commentQueue.forEach(comment => {
        comSection.innerHTML += `
            <p><strong>${comment.comment_name}: </strong>
                ${comment.text_comment} 
                <em>${new Date(comment.timestamp).toLocaleString()}</em>
            </p>`;
    });
}

function sortComments() {
    sortOrder = document.getElementById("sortOrder").value;
    commentQueue.sort((a, b) => 
        (sortOrder === 'desc') ? 
            (b.timestamp - a.timestamp) : (a.timestamp - b.timestamp));
    renderComments();
}

commentButton.addEventListener("click", addComment);

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